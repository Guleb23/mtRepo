import React, { useEffect, useState } from 'react'
import CustomHeader from '../CustomHeader'
import CustomBtn from '../CustomBtn'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar'
import Modal from './Modal'

const DocumentsSkelet = () => {
    const location = useLocation();
    const path = location.pathname;
    const navigator = useNavigate();
    useEffect(() => {

        const id = localStorage.getItem("id")
        const token = localStorage.getItem("token")

        if (!token && !id) {
            navigator("/documents/noneuser");
            return;
        }
    }, [])
    return (
        <section className={`flex flex-col gap-5 pb-36 h-full `} >

            <CustomHeader title={"Документы"} />
            <nav className='flex gap-3'>
                <Link to={'/documents/userDocuments'}>
                    <CustomBtn customStyles={path == "/documents/userDocuments" ? "!bg-[#b4b7bb]" : ""} title={"Мои документы"} />
                </Link>
                <Link to={'/documents/companyDocuments'}>
                    <CustomBtn customStyles={path == "/documents/companyDocuments" ? "!bg-[#b4b7bb]" : ""} title={"От компании"} />
                </Link>

            </nav>
            <SearchBar />

            <>
                <Outlet />
            </>
        </section >
    )
}

export default DocumentsSkelet
