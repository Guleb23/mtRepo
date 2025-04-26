import React from 'react'
import CustomBtn from './CustomBtn'
import { Link } from 'react-router-dom'
import useAuth from '../Hooks/useAuth';

const ServicesCard = ({ title, description, price, image, id }) => {
    const { auth } = useAuth();
    return (
        <div className='bg-white py-3.5 px-1.5 flex items-center gap-4 rounded-3xl border-[#E8EDF2] border-1  lg:px-16'>
            <picture>
                <img className='object-fill rounded-2xl ' width={100} height={100} src={image} />
            </picture>
            <div className='flex flex-col gap-2 md:flex-row md:w-full md:items-center'>
                <div className='flex flex-col gap-2 md:flex-[1_1_80%]'>
                    <p className='text-xl font-medium'>{title}</p>
                    <p className='text-[14px] text-[#4F7396] w-60 md:w-auto'>{description}</p>
                </div>
                <p className='text-[16px] font-medium md:flex-[1_1_20%]' >От {price} ₽</p>
                <Link to={`/${id}`}>
                    <CustomBtn title={`Подробнее`} onClick={() => console.log(auth)} />
                </Link>

            </div>

        </div>
    )
}

export default ServicesCard
