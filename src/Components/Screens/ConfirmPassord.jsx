import React, { useState } from 'react'
import CustomInput from '../CustomInput'
import CustomBtn from '../CustomBtn';
import { useLocation, useNavigate } from 'react-router-dom';

import axsios from '../../api/axsios';
import useAuth from '../../Hooks/useAuth';
const LOGIN_URL = '/login';
const ConfirmPassord = () => {
    const { setAuth } = useAuth();
    const [password, setPassword] = useState("");
    const location = useLocation();
    const user = location.state; // Получаем объект из state
    const phone = user.data.tel;
    const navigate = useNavigate();


    const handleClick = () => {
        console.log(user.data);
        if (user.data.pass == password) {
            axsios.post(LOGIN_URL, {
                phone,
                password
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
                .then((response) => {
                    setAuth({
                        token: response.data.token,
                        id: response.data.id

                    });
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("id", response.data.id)
                    navigate("/profile");
                })
                .catch((error) => {
                    console.error("Error:", error, " ", phone);
                });
        } else {
            alert("Неверный пароль")
        }
    }

    return (
        <>
            <CustomInput handleChange={(e) => { setPassword(e.target.value) }} inpId={`Password`} name={`Пароль`} />
            <div className='flex flex-1 items-end lg:items-start lg:flex-none '>

                <CustomBtn onClick={handleClick} customStyles={`w-full  h-10 !bg-[#1A80E5] text-white`} title={`Продолжить`} />

            </div>
        </>
    )
}

export default ConfirmPassord
