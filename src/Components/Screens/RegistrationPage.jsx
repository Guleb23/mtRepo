import React, { useState, useEffect } from 'react';
import CustomBtn from '../CustomBtn';
import PhoneInput from '../PhoneInput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        paymentMethodId: 1,
        getDocsSposobId: 1,
    });

    useEffect(() => {
        window.addEventListener("message", (event) => {
            if (event.origin !== "https://telegram.org") return;
            console.log("Данные от Telegram:", event.data);
            sendDataToBackend(event.data);
        });

        // Загружаем Telegram-скрипт динамически
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-widget.js?7";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            window.removeEventListener("message", () => { });
        };
    }, []);

    const sendDataToBackend = async (resp) => {
        try {
            const response = await axios.post("https://guleb23-webapplication2-a40c.twc1.net/auth/telegram", resp);
            setAuth({
                token: response.data.token,
                id: response.data.id
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data.id);

            await axios.post(`https://api.telegram.org/bot7727632703:AAGv-kh_6djINiHRjRc_CoLge-gOPhS2-lY/sendMessage`, {
                chat_id: response.data.id,
                text: "Вы успешно зарегистрировались через Telegram! 🎉"
            });

            navigate("/profile");
        } catch (error) {
            console.error("❌ Ошибка при отправке данных:", error);
        }
    };

    const handleClick = async () => {
        if (user.phone.length < 10) {
            alert("Некорректный номер телефона");
        } else {
            try {
                const resp = await axios.post("/createUser", user);
                if (resp.status === 200) {
                    console.log(resp.data);
                    const data = {
                        pass: resp.data.password,
                        tel: resp.data.phone
                    };
                    navigate("/confirm", { state: { data } });
                }
            } catch (err) {
                if (err.response?.status === 409) {
                    alert("Пользователь с таким номером уже зарегистрирован");
                }
            }
        }
    };

    return (
        <>
            <PhoneInput
                phone={user.phone}
                handleChange={(formattedPhone) => setUser({ ...user, phone: formattedPhone })}
                inpId="userPhone"
                name="Введите свой номер телефона"
            />
            <div className='flex flex-1 items-end lg:items-start lg:flex-none gap-2'>
                <CustomBtn onClick={handleClick} customStyles='w-full h-10 !bg-[#1A80E5] text-white' title='Регистрация' />
                <div dangerouslySetInnerHTML={{
                    __html: `<script async src="https://telegram.org/js/telegram-widget.js?7"
                        data-telegram-login="esgikh_bot"
                        data-size="large"
                        data-auth-url="https://guleb23-webapplication2-a40c.twc1.net/auth/telegram"
                        data-request-access="write">
                    </script>`
                }} />
            </div>
        </>
    );
};

export default RegistrationPage;
