import React from 'react'
import CustomHeader from '../CustomHeader'
import CustomBtn from '../CustomBtn'
import { Link } from 'react-router-dom'

const Documents = () => {
    return (
        <section className='flex flex-col gap-5 pb-36'>
            <CustomHeader title={`Документы`} />
            <div className='flex flex-col gap-4 '>
                <div className='flex'>
                    <CustomBtn customStyles={`w-44`} title={`Документы по заказам`} />\
                    <CustomBtn customStyles={`w-44`} title={`Мои документы`} />
                </div>
            </div>
        </section>
    )
}

export default Documents
