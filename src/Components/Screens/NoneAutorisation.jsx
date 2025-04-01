import React from 'react'
import CustomBtn from '../CustomBtn'
import { Link } from 'react-router-dom'

const NoneAutorisation = ({ text }) => {
    return (
        <div className=' flex flex-1 flex-col gap-2 font-medium justify-center items-center'>
            <img width={200} src='../Images/Logo.svg' />
            <p>Вы не авторизованы</p>
            <p className='text-[#1A80E5] text-xs'>{text}</p>
            <div className='flex gap-3'>
                <Link to={`/login`}>
                    <CustomBtn title={`Войти`} customStyles={`!bg-[#1A80E5] text-white`} />
                </Link>
                <Link to={`/registration`}>
                    <CustomBtn title={`Зарегистрироваться`} />
                </Link>

            </div>
        </div>
    )
}

export default NoneAutorisation
