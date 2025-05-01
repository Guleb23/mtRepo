import React, { useState } from 'react'
import NavBarButton from './NavBarButton'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../Hooks/useAuth';

const NavBarItems = () => {
    const location = useLocation();
    const { auth } = useAuth();
    const [isManager, setIsManager] = useState(false);
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
            link: '/personalData',
            iconPath: '../MenuIcons/four.svg',
            isActive: location.pathname.startsWith('/personalData')
        },
    ]
    const managerItems = [
        {
            title: 'Обьекты в работе',
            link: '/objects',
            iconPath: '../MenuIcons/two.svg',
            isActive: location.pathname === '/objects'
        },
        {
            title: 'Чат с пользователями',
            link: '/',
            iconPath: '../MenuIcons/three.svg',
            isActive: location.pathname === '/chat'
        },
    ];

    const profile = {
        title: 'Профиль',
        link: '/profile',
        iconPath: '../MenuIcons/Profik.svg',
        isActive: location.pathname.startsWith('/profile')
    }


    return (
        <div className='w-full flex justify-center py-4 gap-10 items-center'>
            {
                !isManager || null ? navBarItems.map((item, index) => (
                    <NavBarButton key={`${index}__${item.link}`} icon={item.iconPath} title={item.title} to={item.link} isActive={item.isActive} />
                )) :
                    managerItems.map((item, index) => (
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
