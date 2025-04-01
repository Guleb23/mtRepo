import React, { useEffect, useState } from 'react'
import CustomHeader from '../CustomHeader'
import CustomInput from '../CustomInput'
import CustomFilePicker from '../CustomFilePicker'
import CustomBtn from '../CustomBtn'
import NoneAutorisation from './NoneAutorisation'
import axsios from '../../api/axsios'
import { useNavigate } from 'react-router-dom'

const PersonalData = ({ user }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigator = useNavigate();


    useEffect(() => {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        if (!token) {
            navigator("/personalData/noneuser");
            return;
        }
        try {
            axsios.get(`/persdata/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((resp) => setData(resp.data));
        } catch (err) {
            console.log(err);

        } finally {
            setLoading(false);
        }


    }, [])


    const hundleClick = () => {
        const id = data.id;
        const token = localStorage.getItem("token");
        axsios.put(`/persData/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            setData(resp.data);
            alert("Вы успешно обновили данные")
        }
        );

    }

    if (loading) {
        return (
            <div>Загрузка</div>
        )
    }

    return (
        <div className='flex flex-col gap-5 pb-36 h-full'>
            <CustomHeader title={`Персональные данные`} />
            {user ? <IsUser setData={setData} data={data} hundleClick={hundleClick} /> : <NoneAutorisation text={`Тут будут ваши данные, необходимые для формирования заказа`} />}

        </div>
    )
}

export default PersonalData


const IsUser = ({ data, hundleClick, setData }) => {
    return (
        <div className='flex flex-col gap-4 pb-36'>
            <h2 className='font-medium'>
                Введите  свои паспортные данные:
            </h2>
            <div className='flex flex-col gap-4 lg:flex-row '>
                <div className='flex flex-col gap-4 lg:flex-1'>
                    <CustomInput value={data.seria} handleChange={(e) => setData({ ...data, seria: e.target.value })} inpId={`Seria`} name={`Серия`} />
                    <CustomInput value={data.nomer} handleChange={(e) => setData({ ...data, nomer: e.target.value })} inpId={`Nomer`} name={`Номер`} />
                </div>
                <div className='flex flex-col gap-4 lg:flex-1'>
                    <CustomInput value={data.dateVidachi} handleChange={(e) => setData({ ...data, dateVidachi: e.target.value })} inpId={`DateVidachi`} name={`Дата выдачи`} />
                    <CustomInput value={data.whoVidal} handleChange={(e) => setData({ ...data, whoVidal: e.target.value })} inpId={`Vidan`} name={`Кем выдан`} />
                </div>
                <div className='lg:flex-1'>
                    <CustomInput value={data.propiska} handleChange={(e) => setData({ ...data, propiska: e.target.value })} inpId={`Propiska`} name={`Прописка`} />
                </div>
            </div>
            <h2 className='font-medium'>
                Введите номер СНИЛС:
            </h2>
            <CustomInput value={data.snils} handleChange={(e) => setData({ ...data, snils: e.target.value })} inpId={`snils`} name={`Номер снилса`} />
            <h2 className='font-medium'>
                Загрузите фото и мы все сделаем за вас:
            </h2>
            <CustomFilePicker />
            <CustomBtn onClick={hundleClick} title={`Сохранить`} customStyles={`!bg-[#1A80E5] text-white`} />


        </div>

    )
}