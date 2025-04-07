import React from 'react'

const CustomBtn = ({ title, customStyles, onClick, icon }) => {
    return (
        <button onClick={onClick} className={` bg-[#E8EDF2]  gap-3 w-40 text-xs font-medium rounded-xl px-4 py-2 flex items-center justify-center w-cover hover:bg-[#b4b7bb] transition-all ${customStyles && customStyles}`}>
            {icon ? <p>{icon && icon}</p> : ""}
            <p>{title}</p>
        </button>
    )
}

export default CustomBtn
