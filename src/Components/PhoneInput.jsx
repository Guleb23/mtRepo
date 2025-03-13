import React, { useState } from 'react'

const PhoneInput = ({ handleChange, name, inpId, phone }) => {



    return (
        <div className='flex flex-col gap-1 '>
            <label htmlFor={inpId} className='text-[#727376] text-xs'>
                {name}
            </label>
            <div className='h-8 bg-[#F7FAFC] border-[#D1DBE8] border rounded-xl'>
                <input id={inpId}
                    value={phone}
                    onChange={handleChange}
                    placeholder={`+7 (999) 999-99-99"`} className='w-full appearance-none outline-0 px-2 text-xs' />
            </div>
        </div>
    )
}

export default PhoneInput
