import React, { useEffect } from 'react'
import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'





const CustomDataList = ({ data, onselect, id }) => {
    const [selected, setSelected] = useState(data[id - 1]);
    const [hasClicked, setHasClicked] = useState(false);

    useEffect(() => {
        onselect(selected);
    }, [selected]); // Вызываем onselect только при изменении selected


    const handleChange = (value) => {
        setSelected(value);
        setHasClicked(!hasClicked);
    }


    return (
        <Listbox value={selected} onChange={handleChange}>
            <div className="relative mt-2">
                <ListboxButton onClick={() => {
                    setHasClicked(!hasClicked);


                }} className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[#727376] sm:text-sm/6">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">

                        <span className="block truncate">{selected.name}</span>

                    </span>
                    <img width={20} height={20} className={`className="col-start-1 row-start-1 size-5 self-center transition-all justify-self-end  text-gray-500 sm:size-4 ${hasClicked ? 'rotate-180' : ''}`} src='./Images/arrDown.svg' />


                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                >
                    {data.map((sp) => (
                        <ListboxOption
                            key={sp.id}
                            value={sp}
                            className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-[#727376] data-focus:text-white data-focus:outline-hidden"
                        >
                            <div className="flex items-center">

                                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{sp.name}</span>
                            </div>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">

                            </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}

export default CustomDataList


