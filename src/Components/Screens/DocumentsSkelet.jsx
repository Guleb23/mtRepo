import React, { useState } from 'react'
import CustomHeader from '../CustomHeader'
import CustomBtn from '../CustomBtn'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from '../SearchBar'
import Modal from './Modal'

const DocumentsSkelet = ({ children }) => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <div>

            <section className={`flex flex-col gap-5 pb-36 h-full `} >

                <CustomHeader title={"Документы"} />
                <nav className='flex gap-3'>
                    <Link to={'/userDocuments'}>
                        <CustomBtn customStyles={path == "/userDocuments" ? "!bg-[#b4b7bb]" : ""} title={"Мои документы"} />
                    </Link>
                    <Link to={'/companyDocuments'}>
                        <CustomBtn customStyles={path == "/companyDocuments" ? "!bg-[#b4b7bb]" : ""} title={"От компании"} />
                    </Link>

                </nav>
                <SearchBar />

                <>
                    {children}
                </>
            </section >
        </div>

    )
}

export default DocumentsSkelet
