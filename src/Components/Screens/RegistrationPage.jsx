import React, { useState } from 'react'

import CustomBtn from '../CustomBtn'
import PhoneInput from '../PhoneInput'
import axsios from '../../api/axsios';
import { useNavigate } from 'react-router-dom';
import TelegramLoginButton from 'react-telegram-login';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';



const RegistrationPage = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const navigation = useNavigate();
    const handleTelegramResponse = (response) => {
        console.log(response); // Данные пользователя
        sendDataToBackend(response);
    };

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        paymentMethodId: 1,
        getDocsSposobId: 1,

    });

    const [data, setData] = useState({});
    const sendDataToBackend = async (resp) => {
        try {
            const response = await axios.post("https://guleb23-webapplication2-a40c.twc1.net/auth/telegram", resp);
            setAuth({
                token: response.data.token,
                id: response.data.id

            });
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("id", response.data.id)
            // Отправляем сообщение пользователю через Telegram API
            await axios.post(`https://api.telegram.org/bot7727632703:AAGv-kh_6djINiHRjRc_CoLge-gOPhS2-lY/sendMessage`, {
                chat_id: response.data.id,  // ID пользователя
                text: "Вы успешно зарегистрировались через Telegram! 🎉"
            });
            navigate("/profile");
        } catch (error) {
            console.error("❌ Ошибка при отправке данных:", error);
        }
    };



    const handleClick = async () => {
        if (user.phone.length < 10) {
            alert("Uncorrect phone")
        } else {
            await axsios.post("/createUser", user)
                .then((resp) => {
                    if (resp.status == "200") {
                        console.log(resp.data);
                        const data = {
                            pass: resp.data.password,
                            tel: resp.data.phone
                        };
                        console.log(data);
                        navigation("/confirm", { state: { data } });
                    }
                })
                .catch((err) => {
                    if (err.status == "409") {
                        alert("Пользователь с таким номером уже зарегистрирован");
                    }
                })
        }

    }
    return (
        <>
            <PhoneInput
                phone={user.phone}
                handleChange={(formattedPhone) => setUser({ ...user, phone: formattedPhone })}
                inpId="userPhone"
                name="Введите свой номер телефона"
            />
            <div className='flex flex-1 items-end lg:items-start lg:flex-none gap-2 '>

                <CustomBtn onClick={handleClick} customStyles={`w-full  h-10 !bg-[#1A80E5] text-white`} title={`Регистрация`} />
                <TelegramLoginButton
                    botName="esgikh_bot"
                    dataOnauth={handleTelegramResponse}
                    buttonSize="large"
                />
            </div>
            <div className='w-full'>

            </div>

        </>
    )
}

export default RegistrationPage