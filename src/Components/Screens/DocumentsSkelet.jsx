import React, { useState } from 'react'
import CustomHeader from '../CustomHeader'
import CustomBtn from '../CustomBtn'
import { Link, Outlet, useLocation } from 'react-router-dom'
import SearchBar from '../SearchBar'
import Modal from './Modal'

const DocumentsSkelet = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <div>

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
        </div>

    )
}

export default DocumentsSkelet
