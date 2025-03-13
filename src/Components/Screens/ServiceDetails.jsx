import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { servicesData } from '../../StaticData/DataFirServices'
import CustomHeader from '../CustomHeader';
import CustomBtn from '../CustomBtn';

const ServiceDetails = () => {


    const { id } = useParams();
    console.log(id);


    const service = servicesData.find((s) => s.id == id);
    if (!service) {
        return "wtf"
    }


    return (
        <div className='pb-36'>
            <CustomHeader title={`Подробная информация`} />

            <div className='flex flex-col gap-4 lg:flex-row md:items-start md:gap-24 relative py-10  '>
                <div className=' flex flex-col gap-4 order-1 md:flex-1 basic-20'>
                    <div className='flex flex-col gap-2 '>
                        <h2 className='text-xl font-medium'>{service.title ? service.title : ""}</h2>
                        <div className='flex gap-2 text-xs  text-[#4F7396]'>
                            <p>
                                от {service.price} ₽
                            </p>
                            <div className='flex items-center gap-1'>
                                <img src='../ServiceesImages/Frame.svg' />
                                от 10 дней
                            </div>

                        </div>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <p className='text-xl font-medium'>Подробное описание</p>
                        <p >
                            {service.longDescrpt}
                        </p>
                    </div>
                    <CustomBtn customStyles={`w-full`} title={`Заказать услугу`} />
                </div>
                <img className='object-fill rounded-xl flex-[0_0_40%] ' src={service.image} />




            </div>


        </div>
    )
}

export default ServiceDetails
