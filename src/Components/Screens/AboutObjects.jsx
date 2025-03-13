import React from 'react'
import CustomHeader from '../CustomHeader'
import NoneAutorisation from './NoneAutorisation'

const AboutObjects = ({ user }) => {
    return (
        <section className='flex flex-col gap-5 pb-36 h-full'>
            <CustomHeader title={`Ваши обьекты`} />
            {user ? <IsUser /> : <NoneAutorisation text={`Тут будут ваши объекты над которыми мы ведем работу`} />}
        </section>
    )
}

export default AboutObjects


const IsUser = () => {
    return (
        <div >

        </div>

    )
}
