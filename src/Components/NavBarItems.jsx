import React from 'react'
import NavBarButton from './NavBarButton'
import { Link, useLocation } from 'react-router-dom'

const NavBarItems = () => {
    const location = useLocation();
    const navBarItems = [
        {
            title: 'Объекты',
            link: '/aboutObjects',
            iconPath: '../MenuIcons/two.svg',
            isActive: location.pathname === '/aboutObjects'
        },
        {
            title: 'Услуги',
            link: '/',
            iconPath: '../MenuIcons/three.svg',
            isActive: location.pathname === '/'
        },
        {
            title: 'Документы',
            link: '/documents/userDocuments',
            iconPath: '../MenuIcons/one.svg',
            isActive: location.pathname.startsWith('/documents') // Проверяет любой путь, начинающийся с /documents
        },
        {
            title: 'Персональные данные',
            link: '/personalData/data',
            iconPath: '../MenuIcons/four.svg',
            isActive: location.pathname.startsWith('/personalData')
        },
    ]

    const profile = {
        title: 'Профиль',
        link: '/profile/user',
        iconPath: '../MenuIcons/Profik.svg',
        isActive: location.pathname.startsWith('/profile')
    }


    return (
        <div className='w-full flex justify-center py-4 gap-10 items-center'>
            {
                navBarItems.map((item, index) => (
                    <NavBarButton key={`${index}__${item.link}`} icon={item.iconPath} title={item.title} to={item.link} isActive={item.isActive} />
                ))
            }
            <Link className='hidden md:block' to={`/profile`}>
                <img className=' justify-start  ml-16' src='../Images/ProfileIcon.svg' width={50} height={50} />
            </Link>
            <NavBarButton icon={profile.iconPath} to={profile.link} isActive={profile.isActive} />
        </div>
    )
}

export default NavBarItems
