import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import CustomHeader from '../CustomHeader'
import SearchBar from '../SearchBar'

const AppSkelet = ({ title }) => {
    const navigator = useNavigate();


    useEffect(() => {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        if (!token) {
            navigator("/personalData/noneuser");
            return;
        }
        try {
            axsios.get(`/persdata/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((resp) => setData(resp.data));
        } catch (err) {
            console.log(err);

        } finally {
            setLoading(false);
        }


    }, [])

    return (

        <section className={`flex flex-col gap-5  pb-36 h-full `} >
            <CustomHeader title={title} />
            <SearchBar />
            <div className='flex-1 flex justify-center items-center'>
                <Outlet />
            </div>
        </section >

    )
}

export default AppSkelet
