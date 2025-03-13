import React, { useState } from 'react'

const CustomInput = ({ name, inpId, handleChange, value }) => {
    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor={inpId} className='text-[#727376] text-xs'>
                {name}
            </label>
            <div className='h-8 bg-[#F7FAFC] border-[#D1DBE8] border rounded-xl'>
                <input defaultValue={value}

                    onChange={handleChange}
                    id={inpId}
                    className='w-full appearance-none outline-0 px-2 text-xs' />
            </div>
        </div>
    )
}

export default CustomInput
