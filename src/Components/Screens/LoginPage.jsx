import React, { useEffect, useRef, useState } from 'react'
import CustomInput from '../CustomInput'
import PhoneInput from '../PhoneInput'
import CustomBtn from '../CustomBtn'
import axsios from '../../api/axsios'
import useAuth from '../../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'
const LOGIN_URL = '/login';

const LoginPage = () => {
    const { setAuth } = useAuth();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [token, setToken] = useState("");


    const handleChange = (event) => {
        const value = event.target.value;

        // Убираем всё, кроме цифр
        const cleanedValue = value.replace(/\D/g, "");

        // Применяем маску: +7 (XXX) XXX-XX-XX
        let formattedValue = "";
        if (cleanedValue.length > 0) {
            formattedValue += "+7";
            if (cleanedValue.length > 1) {
                formattedValue += `(${cleanedValue.slice(1, 4)}`;
            }
            if (cleanedValue.length > 4) {
                formattedValue += `) ${cleanedValue.slice(4, 7)}`;
            }
            if (cleanedValue.length > 7) {
                formattedValue += `-${cleanedValue.slice(7, 9)}`;
            }
            if (cleanedValue.length > 9) {
                formattedValue += `-${cleanedValue.slice(9, 11)}`;
            }
        }

        // Обновляем состояние
        setPhone(formattedValue);
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
            <form onSubmit={onClick}>


                <PhoneInput phone={phone} handleChange={handleChange} phoneValue={phone} inpId={`userPhone`} name={`Введите свой номер телефона`} />
                <CustomInput handleChange={handlePassword} inpId={`userPassword`} name={`Введите пароль`} />
                <div className='flex flex-1 items-end lg:items-start lg:flex-none '>
                    <CustomBtn customStyles={`w-full  h-10 !bg-[#1A80E5] text-white`} title={`Войти`} />
                </div>
            </form>


        </>
    )
}

export default LoginPage
