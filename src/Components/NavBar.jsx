import React from 'react'
import NavBarItems from './NavBarItems'

const NavBar = () => {
    return (
        <div className='bg-white w-full fixed bottom-0 left-0 md:border-t-[#E5E8EB] md:border-2'>
            <nav className=' bg-[#E8EDF2]  flex mx-1 md:mx-5 mb-5  px-10 rounded-lg items-center h-full md:bg-white  md:py-5 md:m-0 justify-center'>
                <img className='hidden lg:block' src='../Images/Logo.svg' />
                <div className='flex flex-1'>
                    <NavBarItems />
                </div>

                <div className='hidden md:flex  gap-4'>
                    <img src='../Images/Notification.svg' width={50} height={50} />
                    <img src='../Images/Quetion.svg' width={50} height={50} />
                </div>
            </nav>

        </div>
    )
}

export default NavBar
