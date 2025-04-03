import React, { useState } from 'react';
import CustomInput from '../CustomInput';
import PhoneInput from '../PhoneInput';
import CustomBtn from '../CustomBtn';
import axsios from '../../api/axsios';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TelegramLoginButton from '../TelegramLoginButton'; // Импортируем новый компонент

const LOGIN_URL = '/login';

const LoginPage = () => {
    const { setAuth } = useAuth();

    const handleTelegramAuth = (user) => {
        console.log('Telegram user data:', user);

        alert(
            `Вы вошли как ${user.first_name} ${user.last_name || ''} (ID: ${user.id}${user.username ? ', @' + user.username : ''
            })`
        );
        sendDataToBackend(user);
        // Здесь вы можете отправить данные пользователя на ваш сервер
        // для проверки авторизации и создания сессии
    };
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const sendDataToBackend = async (userData) => {
        try {
            const response = await axios.post("https://guleb23-webapplication2-a40c.twc1.net/auth/telegram", {
                id: userData.id,
                first_name: userData.first_name,
                last_name: userData.last_name || '',
                username: userData.username || '',
                photo_url: userData.photo_url || '',
                auth_date: userData.auth_date,
                hash: userData.hash
            },
                {
                    timeout: 10000, // Увеличиваем таймаут до 10 секунд
                });

            setAuth({
                token: response.data.token,
                id: response.data.id
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data.id);
            navigate("/profile");
        } catch (error) {
            console.error("❌ Ошибка при отправке данных:", error);
        }
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const onClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axsios.post(LOGIN_URL, {
                phone,
                password
            }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            setAuth({
                token: response.data.token,
                id: response.data.id
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data.id);
            navigate("/profile");
        } catch (error) {
            console.error("Error:", error, " ", phone);
        }
    };

    return (
        <div className='flex flex-col gap-3'>
            <form onSubmit={onClick} className='flex flex-col gap-3'>
                <PhoneInput phone={phone} handleChange={setPhone} phoneValue={phone} inpId={`userPhone`} name={`Введите свой номер телефона`} />
                <CustomInput
                    handleChange={handlePassword}
                    inpId={`userPassword`}
                    name={`Введите пароль`}
                    type="password"
                />
                <CustomBtn
                    customStyles={`w-full h-10 !bg-[#1A80E5] text-white`}
                    title={`Войти`}
                    type="submit"
                />

                <TelegramLoginButton
                    botName="mybotesgik_bot" // Ваш username бота
                    buttonSize="large"    // large, medium или small
                    onAuth={handleTelegramAuth}
                    className="custom-telegram-button"
                />

            </form>

        </div>
    );
};

export default LoginPage;


