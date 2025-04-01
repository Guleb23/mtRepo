import React, { useEffect, useRef, useState } from 'react'
import CustomInput from '../CustomInput'
import PhoneInput from '../PhoneInput'
import CustomBtn from '../CustomBtn'
import axsios from '../../api/axsios'
import useAuth from '../../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import TelegramLoginButton from 'react-telegram-login';
import axios from 'axios'
const LOGIN_URL = '/login';

const LoginPage = () => {
    const { setAuth } = useAuth();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [token, setToken] = useState("");
    const handleTelegramResponse = (response) => {
        console.log(response); // Данные пользователя
        sendDataToBackend(response);
    };
    const sendDataToBackend = async (resp) => {
        try {
            const response = await axios.post("https://guleb23-webapplication2-a40c.twc1.net/auth/telegram", resp);
            setAuth({
                token: response.data.token,
                id: response.data.id

            });
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("id", response.data.id)
            navigate("/profile");
        } catch (error) {
            console.error("❌ Ошибка при отправке данных:", error);
        }
    };

    const handlePassword = (event) => {
        const value = event.target.value;
        setPassword(value);
    }

    const onClick = async (e) => {
        e.preventDefault();

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


    };


    return (
        <>
            <form onSubmit={onClick} className='flex flex-col gap-3'>


                <PhoneInput phone={phone} handleChange={setPhone} phoneValue={phone} inpId={`userPhone`} name={`Введите свой номер телефона`} />
                <CustomInput handleChange={handlePassword} inpId={`userPassword`} name={`Введите пароль`} />
                <div className='flex flex-1 items-end lg:items-start lg:flex-none gap-2 '>
                    <CustomBtn customStyles={`w-full  h-10 !bg-[#1A80E5] text-white`} title={`Войти`} />
                    <TelegramLoginButton
                        botName="esgikh_bot"
                        dataOnauth={handleTelegramResponse}
                        buttonSize="large"
                    />
                </div>

            </form>


        </>
    )
}

export default LoginPage
