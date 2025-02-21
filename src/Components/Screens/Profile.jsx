import React from 'react'
import CustomHeader from '../CustomHeader'
import CustomInput from '../CustomInput'
import CustomDataList from '../CustomDataList'
import CustomBtn from '../CustomBtn'

const Profile = () => {
    const sposobPay = [
        {
            id: 1,
            name: 'СПБ',
            image: './Images/spb.svg'
        },
        {
            id: 2,
            name: 'Картой',
            image: './Images/card.svg'
        },
        {
            id: 3,
            name: 'ЯндексПей',
            image: './Images/yandex.png'
        }
    ]
    const sposobDocs = [
        {
            id: 1,
            name: 'Лично заберу в офисе',
            image: './Images/goOffice.svg'
        },
        {
            id: 2,
            name: 'Получить онлайн',
            image: './Images/online.svg'
        },

    ]
    return (
        <section className='flex flex-col gap-5'>
            <CustomHeader title={`Профиль`} />
            <div className='flex flex-col gap-4 '>
                <h2 className='font-medium'>
                    Контактная информация
                </h2>
                <CustomInput inpId={`Name`} name={`Имя`} />
                <CustomInput inpId={`LastName`} name={`Фамилия`} />
                <CustomInput inpId={`Email`} name={`Электронная почта`} />
                <CustomInput inpId={`Phone`} name={`Контактный телефон`} />
                <h2 className='font-medium'>
                    Выберите способ оплаты
                </h2>
                <CustomDataList data={sposobPay} />
                <h2 className='font-medium'>
                    Выберите способ получения документов
                </h2>
                <CustomDataList data={sposobDocs} />
                <CustomBtn title={`Сохранить`} customStyles={`!bg-[#1A80E5] text-white`} />
            </div>
        </section>
    )
}

export default Profile
