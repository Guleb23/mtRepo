import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import CustomHeader from '../CustomHeader'
import SearchBar from '../SearchBar'

const AppSkelet = ({ title, path }) => {
    const navigator = useNavigate();

    useEffect(() => {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        if (!token && !id) {
            navigator(`${path}/noneuser`);
            return;
        }
    }, [navigator])

    return (

        <section className={`flex flex-col gap-5  pb-36 h-full w-full `} >
            <CustomHeader title={title} />

            <div className='flex-1 flex justify-center items-center'>
                <Outlet />
            </div>
        </section >

    )
}

export default AppSkelet
