import React, { useEffect, useState } from "react";
import axios from "../../api/axsios";
import { useNavigate } from "react-router-dom";
import TelegramLogin from "../TelegramLogin";

const RegistrationPage = () => {
    const navigation = useNavigate();
    const [userData, setUserData] = useState(null);
    const [user, setUser] = useState({});

    // Когда userData обновляется, запускаем sendDataToBackend
    useEffect(() => {
        if (userData) {
            sendDataToBackend(userData);
        }
    }, [userData]); // <-- следим за userData

    const sendDataToBackend = async (user) => {
        try {
            const response = await axios.post("https://guleb23-webapplication2-a40c.twc1.net/auth/telegram", user);
            setUser({ firstName: user.first_name });
            localStorage.setItem("token", response.data.token);
            console.log("✅ Данные успешно отправлены:", response.data);
        } catch (error) {
            console.error("❌ Ошибка при отправке данных:", error);
        }
    };

    // Когда Telegram авторизует пользователя, обновляем userData
    const handleTelegramAuth = (user) => {
        console.log("🔹 Получены данные из Telegram:", user);
        setUserData(user);
    };

    return (
        <>
            <PhoneInput phone={user.phone} handleChange={(e) => { setUser({ ...user, phone: e.target.value }) }} phoneValue={user.Phone} inpId={`userPhone`} name={`Введите свой номер телефона`} />
            <div className='flex flex-1 items-end lg:items-start lg:flex-none '>
                <CustomBtn onClick={handleClick} customStyles={`w-full  h-10 !bg-[#1A80E5] text-white`} title={`Регистрация`} />
                <TelegramLogin />
            </div>
        </>
    )
}

export default RegistrationPage