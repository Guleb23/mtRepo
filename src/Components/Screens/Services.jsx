import React from 'react'
import SearchBar from '../SearchBar'
import ServicesCard from '../ServicesCard'
import { servicesData } from '../../StaticData/DataFirServices'
import CustomHeader from '../CustomHeader'

const Services = () => {
    return (
        <section className='flex flex-col gap-4 overflow-x-hidden' >
            <CustomHeader title={`Услуги`} />
            <SearchBar />
            <div className='flex flex-col gap-4 pb-36'>
                {servicesData.map((item, index) => (
                    <ServicesCard
                        key={`${index}__`}
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        price={item.price}
                        image={item.image} />
                ))}

            </div>

        </section>
    )
}

export default Services
