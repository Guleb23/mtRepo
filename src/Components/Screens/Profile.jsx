import React, { createContext, useEffect, useState } from 'react'
import CustomHeader from '../CustomHeader'
import CustomInput from '../CustomInput'
import CustomDataList from '../CustomDataList'
import CustomBtn from '../CustomBtn'
import NoneAutorisation from './NoneAutorisation'
import axsios from '../../api/axsios'
import { useNavigate } from 'react-router-dom'

const Profile = ({ user }) => {
    const navigator = useNavigate();
    const [paymentMethods, setPaymentMethods] = useState([]); // Состояние для хранения списка способов оплаты
    const [loading, setLoading] = useState(true); // Состояние для отображения загрузки
    const [error, setError] = useState(true); // Состояние для отображения загрузки
    const [docs, setDocs] = useState([]);
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        paymentMethodId: 1,
        getDocsSposobId: 1
    });


    //UpdateData
    const [selectedPay, setSelectedPay] = useState({
        id: 1,
        name: ""
    });
    const [selectedDocs, setSelectedDosc] = useState({
        id: 1,
        name: ""
    });



    useEffect(() => {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");

        if (!token) {
            navigator("/noneuser");
            return;
        }


        const fetch = async () => {
            try {
                // Выполняем все три запроса одновременно
                const [response1, response2, response3] = await Promise.all([
                    axsios.get(`/user/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },

                    }).catch((error) => {
                        setError(error);
                        if (error.response && error.response.status === 401) {

                            navigator("/login");
                        }


                    }),
                    axsios.get("/payments"),
                    axsios.get("/docs"),
                ]);

                // Сохраняем данные в состояние
                setDocs(response3.data);
                setPaymentMethods(response2.data);
                setData({
                    firstName: response1?.data?.firstName,
                    lastName: response1?.data?.lastName,
                    phone: response1?.data?.phone,
                    email: response1?.data?.email,
                    paymentMethodId: response1?.data?.paymentMethodId,
                    getDocsSposobId: response1?.data?.getDocsSposobId,
                })
            } catch (error) {
                setError("Не удалось загрузить данные");
            } finally {
                setLoading(false); // Загрузка завершена
            }
        };
        fetch();
    }, []);
    const handleSelectPay = (selectedPay) => {
        console.log('Selected item:', selectedPay);
    };
    const handleSelectDocs = (selectedDocs) => {
        setSelectedDosc(selectedDocs); // Сохраняем выбранный элемент в состоянии
    };

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            getDocsSposobId: selectedDocs.id,
            paymentMethodId: selectedPay.id,
        }));
    }, [selectedPay, selectedDocs]); // Зависимости: selectedPay и selectedDocs


    if (loading) {
        return <p>Загрузка...</p>;
    }


    const updateUser = () => {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");

        axsios.patch(`/user/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },

        }).then((resp) => alert("Вы успешно обновили данные!")).catch((err) => alert(err))

    }

    const logout = () => {
        localStorage.clear();
        navigator('/login')
    }
    return (
        <section className='flex flex-col gap-5 pb-36 h-full overflow-y-auto'>
            {user ?
                <div className='flex flex-col gap-4 '>
                    <h2 className='font-medium'>
                        Контактная информация
                    </h2>
                    <CustomInput value={data.firstName} handleChange={(e) => { setData({ ...data, firstName: e.target.value }) }} inpId={`Name`} name={`Имя`} />

                    <CustomInput value={data.lastName} handleChange={(e) => { setData({ ...data, lastName: e.target.value }) }} inpId={`LastName`} name={`Фамилия`} />
                    <CustomInput value={data.email} handleChange={(e) => { setData({ ...data, email: e.target.value }) }} inpId={`Email`} name={`Электронная почта`} />
                    <CustomInput value={data.phone} handleChange={(e) => { setData({ ...data, phone: e.target.value }) }} inpId={`Phone`} name={`Контактный телефон`} />
                    <CustomInput value={data.password} handleChange={(e) => { setData({ ...data, password: e.target.value }) }} inpId={`Password`} name={`Смена пароля`} />
                    <h2 className='font-medium'>
                        Выберите способ оплаты
                    </h2>
                    <CustomDataList onselect={handleSelectPay} data={paymentMethods} id={data.paymentMethodId} />
                    <h2 className='font-medium'>
                        Выберите способ получения документов
                    </h2>
                    <CustomDataList onselect={handleSelectDocs} data={docs} id={data.getDocsSposobId} />

                    <CustomBtn onClick={updateUser} title={`Сохранить`} customStyles={`!bg-[#1A80E5] text-white`} />
                    <button onClick={logout} className='bg-[#f73838] text-white w-40 text-xs font-medium rounded-xl px-4 py-2 flex items-center justify-center w-cover'>

                        Выйти
                    </button>
                </div>
                : <NoneAutorisation text={`Тут будут данные профиля`} />}

        </section>
    )
}

export default Profile
