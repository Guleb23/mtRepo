import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavBarButton = ({ title, to, icon }) => {

    const location = useLocation();

    return (
        <Link to={to}>
            <p className={`hidden md:block  ${isActive ? "font-bold" : ""}`} >
                {title}
            </p>
            <div className={`md:hidden py-2 w-10 ${isActive ? "bg-[#C1C8CF]" : ""} rounded-xl flex items-center justify-center`}>
                <picture>
                    <img src={icon} fetchPriority="high" loading='lazy' width={25} height={25} />
                </picture>

            </div>



        </Link>
    )
}

export default NavBarButton
