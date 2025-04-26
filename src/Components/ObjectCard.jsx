import React from 'react'
import { FaUserGraduate } from "react-icons/fa";
import CustomBtn from './CustomBtn';
const ObjectCard = ({ object }) => {
    return (
        <div className='border border-[#E5E8EB] rounded-lg px-6 py-8 bg-white h-fit'>
            <div className='flex flex-col gap-5'>
                <div className='flex items-center gap-3'>
                    <div className=''>
                        <FaUserGraduate size={20} />
                    </div>
                    <div className='font-main flex-1'>
                        <p className='text-lg font-bold'>{object.manager.name}</p>
                        <p className='text-sm text-[#727376]'>Ваш персональный менеджер</p>
                    </div>
                </div>
                <div className='flex flex-col text-sm md:text-[14px] gap-2'>
                    <p className='text-lg font-bold'>Об объекте:</p>
                    <div className='flex gap-0.5 items-center'>
                        <p className='font-bold'>Статус объекта:</p>
                        <p className='text-[#727376]'>{object.status.name}</p>
                    </div>
                    <div className='flex gap-0.5 items-center'>
                        <p className='font-bold'>Адрес объекта:</p>
                        <p className='text-[#727376]'>{object.address}</p>
                    </div>
                    <div className='flex gap-0.5 items-center'>
                        <p className='font-bold'>Кадастровый номер:</p>
                        <p className='text-[#727376]'>{object.kadastrNumber}</p>
                    </div>
                </div>
                <div className='flex flex-col text-sm md:text-[14px] gap-2'>
                    <p className='text-lg font-bold'>Работы:</p>
                    <div className='flex gap-0.5 items-center'>
                        <p className='font-bold'>Вид работ:</p>
                        <p className='text-[#727376]'>{object.typeOfWork}</p>
                    </div>
                    <div className='flex gap-0.5 items-center'>
                        <p className='font-bold'>Ваш кадастровый инженер:</p>
                        <p className='text-[#727376]'>{object.kadastrEngineer.name}</p>
                    </div>
                    <div className='flex gap-0.5 items-center'>
                        <p className='font-bold'>Ваш геодезист:</p>
                        <p className='text-[#727376]'>{object.geodesist.name}</p>
                    </div>
                    <div className='flex gap-0.5 items-center'>
                        <p className='font-bold'>Дата и время выезда:</p>
                        <p className='text-[#727376]'>20.12.2025 15:00</p>
                    </div>
                    <div className='flex gap-0.5 items-center'>
                        <p className='font-bold'>Стоимость</p>
                        <p className='text-[#727376]'>{Number.parseInt(object.price) === 0 ? "Рассчитывается..." : `${object.price}₽`}</p>
                    </div>
                </div>
                <CustomBtn customStyles={`!w-full `} title={`Чат с менеджером`} />
                <CustomBtn customStyles={`!bg-[#1A80E5] !w-full text-white`} title={`Оплатить`} />
            </div>
        </div>
    )
}

export default ObjectCard
