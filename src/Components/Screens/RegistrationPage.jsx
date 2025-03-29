import React, { useState } from 'react';
import CustomBtn from '../CustomBtn';
import PhoneInput from '../PhoneInput';
import axios from '../../api/axsios';
import { useNavigate } from 'react-router-dom';
import TelegramLogin from '../TelegramLogin';

const RegistrationPage = () => {
    const [userData, setUserData] = useState(null);

    const sendDataToBackend = async (user) => {
        try {
            const response = await axios.post("https://guleb23-webapplication2-a40c.twc1.net/auth/telegram", user);
            response.data.
                console.log("✅ Успешная авторизация:", response.data);
        } catch (error) {
            console.error("❌ Ошибка при отправке данных:", error);
        }
    };

    // Отправляем данные на сервер, как только они получены от Telegram
    const handleTelegramAuth = (user) => {
        setUserData(user);
        sendDataToBackend(user);
    };

    return (
        <>
            <PhoneInput
                phone={user.phone}
                handleChange={(e) => setUser({ ...user, phone: e.target.value })}
                inpId={`userPhone`}
                name={`Введите свой номер телефона`}
            />
            <div className='flex flex-1 items-end lg:items-start lg:flex-none '>
                <TelegramLogin onAuth={handleTelegramAuth} />
            </div>
        </>
    );
};

export default RegistrationPage;
