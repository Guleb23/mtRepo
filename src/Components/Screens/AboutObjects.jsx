import React, { useEffect, useState } from 'react'
import CustomHeader from '../CustomHeader'
import NoneAutorisation from './NoneAutorisation'
import axsios from '../../api/axsios'
import SearchBar from "../SearchBar"

import ObjectCard from '../ObjectCard'

const AboutObjects = ({ user }) => {
    return (
        <section className='flex flex-col gap-5 pb-36 h-full'>
            <CustomHeader title={`Ваши обьекты`} />
            <SearchBar />
            {user ? <IsUser /> : <NoneAutorisation text={`Тут будут ваши объекты над которыми мы ведем работу`} />}
        </section>
    )
}

export default AboutObjects


const IsUser = () => {
    const [objects, setObjects] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async (id) => {
        try {
            const resp = await axsios.get(`Orders/${id}`);
            setObjects(resp.data);
            console.log(resp.data);
        } catch (e) {
            console.error("Error fetching data:", e);
            setObjects([]); // Устанавливаем пустой массив в случае ошибки
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const id = localStorage.getItem("id");
        if (id) {
            fetchData(id);
        } else {
            setLoading(false);
            setObjects([]);
        }
    }, []);

    if (loading) {
        return <>Loading...</>;
    }

    if (!objects || objects.length === 0) {
        return <div className='flex flex-1 justify-center'>No orders found</div>;
    }

    return (
        <div className='flex flex-1 justify-center'>
            <div className='grid md:grid-cols-3 gap-4 w-full'>
                {objects.map((obj, index) => (
                    <ObjectCard object={obj} key={index} />
                ))}
            </div>
        </div>
    );
}