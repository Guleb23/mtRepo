import React, { useState } from 'react';
import CustomBtn from '../CustomBtn';
import PhoneInput from '../PhoneInput';
import axios from '../../api/axsios';
import { useNavigate } from 'react-router-dom';
import TelegramLogin from '../TelegramLogin';

const RegistrationPage = () => {
    const navigation = useNavigate();
    const [userData, setUserData] = useState(null);  // <-- сюда передаем данные из Telegram

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        paymentMethodId: 1,
        getDocsSposobId: 1,
    });

    const sendDataToBackend = async (user) => {
        try {
            const response = await axios.post("https://guleb23-webapplication2-a40c.twc1.net/auth/telegram", user);
            console.log("Сервер ответил:", response.data);
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
        }
    };

    const handleClick = async () => {
        if (!userData) {
            alert("Сначала авторизуйтесь через Telegram!");
            return;
        }

        console.log("Данные из Telegram:", userData);
        await sendDataToBackend(userData);
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
                <CustomBtn
                    onClick={handleClick}
                    customStyles={`w-full  h-10 !bg-[#1A80E5] text-white`}
                    title={`Регистрация`}
                />
                <TelegramLogin setUserData={setUserData} />
            </div>
        </>
    );
};

export default RegistrationPage;
