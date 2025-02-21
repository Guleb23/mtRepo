import React from 'react'
import CustomHeader from '../CustomHeader'
import CustomInput from '../CustomInput'
import CustomFilePicker from '../CustomFilePicker'
import CustomBtn from '../CustomBtn'

const PersonalData = () => {
    return (
        <div className='flex flex-col gap-5 pb-36'>
            <CustomHeader title={`Персональные данные`} />
            <div className='flex flex-col gap-4'>
                <h2 className='font-medium'>
                    Введите  свои паспортные данные:
                </h2>
                <div className='flex flex-col gap-4 lg:flex-row '>
                    <div className='flex flex-col gap-4 lg:flex-1'>
                        <CustomInput inpId={`Seria`} name={`Серия`} />
                        <CustomInput inpId={`Nomer`} name={`Номер`} />
                    </div>
                    <div className='flex flex-col gap-4 lg:flex-1'>
                        <CustomInput inpId={`DateVidachi`} name={`Дата выдачи`} />
                        <CustomInput inpId={`Vidan`} name={`Кем выдан`} />
                    </div>
                    <div className='lg:flex-1'>
                        <CustomInput inpId={`Propiska`} name={`Прописка`} />
                    </div>
                </div>
                <h2 className='font-medium'>
                    Введите номер СНИЛСА:
                </h2>
                <CustomInput inpId={`snils`} name={`Номер снилса`} />
                <h2 className='font-medium'>
                    Загрузите фото и мы все сделаем за вас:
                </h2>
                <CustomFilePicker />
                <CustomBtn title={`Сохранить`} customStyles={`!bg-[#1A80E5] text-white`} />


            </div>

        </div>
    )
}

export default PersonalData
