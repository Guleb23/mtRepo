import React from 'react'

const CustomHeader = ({ title }) => {
    return (
        <div className='flex items-center'>
            <h1 className='flex-1 font-bold text-2xl'>
                {title}
            </h1>
            <img className='lg:hidden' src='../Images/Logo.svg' />
        </div>
    )
}

export default CustomHeader
