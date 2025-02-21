import React from 'react'

const SearchBar = () => {
    return (
        <div className='bg-[#E8EDF2] h-12 w-full rounded-3xl flex items-center px-4 gap-4'>
            <picture>
                <img src='../searchIcon.svg' />
            </picture>
            <input className='text-xs text-[#4F7396] appearance-none outline-0 w-full' placeholder='Поиск'>
            </input>
        </div>
    )
}

export default SearchBar
