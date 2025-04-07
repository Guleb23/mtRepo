import React from 'react'

import { useLocation } from 'react-router-dom';

const LoginRegistrSkelet = ({ children }) => {
    const location = useLocation();

    return (
        <div className='flex flex-col gap-8 pb-36 lg:flex-row h-full overflow-y-auto  lg:items-center'>
            <img loading="lazy" className='w-screen h-48 rounded-2xl object-cover lg:order-2 lg:flex-[1_1_50%] lg:h-full' src='\Images\LoginImage.webp' />
            <div className='h-full flex flex-col order-2 gap-4 lg:order-1 lg:flex-[1_1_50%] lg:h-full lg:justify-center'>
                <h1 className='font-medium text-2xl  '>
                    {location.pathname == "/confirm" ? "Подтвердите пароль" : "Добро пожаловать👋"}
                </h1>
                <p className='text-[#4F7396] text-[14px]'>
                    {location.pathname == "/confirm" ? "Мы выслали СМС с паролем на ваш номер телефона" : "Наша геодезия — это не просто измерения, это гарантия точности и профессионализма в каждом сантиметре"}

                </p>
                {children}


            </div>

        </div>
    )
}

export default LoginRegistrSkelet
