import React from 'react'
import NavBarButton from './NavBarButton'
import { Link } from 'react-router-dom'

const NavBarItems = () => {

    const navBarItems = [
        {
            title: 'Объекты',
            link: '/aboutObjects',
            iconPath: '../MenuIcons/two.svg'
        },
        {
            title: 'Услуги',
            link: '/',
            iconPath: '../MenuIcons/three.svg'
        },

        {
            title: 'Документы',
            link: '/documents/userDocuments',
            iconPath: '../MenuIcons/one.svg',
            isActive: location.pathname.includes('/documents')
        },

        {
            title: 'Персональные данные',
            link: '/personalData',
            iconPath: '../MenuIcons/four.svg'
        },
    ]


    return (
        <div className='w-full flex justify-center py-4 gap-10 items-center'>
            {
                navBarItems.map((item, index) => (
                    <NavBarButton key={`${index}__${item.link}`} icon={item.iconPath} title={item.title} to={item.link} isActive={item.isActive || location.pathname === item.link} />
                ))
            }
            <Link className='hidden md:block' to={`/profile`}>
                <img className=' justify-start  ml-16' src='../Images/ProfileIcon.svg' width={50} height={50} />
            </Link>
            <NavBarButton icon={`../MenuIcons/Profik.svg`} to={`/profile`} />
        </div>
    )
}

export default NavBarItems
