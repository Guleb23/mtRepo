import React, { useState } from 'react'

import CustomBtn from '../CustomBtn'
import PhoneInput from '../PhoneInput'
import axsios from '../../api/axsios';
import { useNavigate } from 'react-router-dom';
import TelegramLoginButton from '../TelegramLoginButton';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';




const RegistrationPage = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const navigation = useNavigate();

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
                {/* Используем вынесенный компонент */}
                <TelegramLoginButton
                    botName="mybotesgik_bot" // Ваш username бота
                    buttonSize="large"    // large, medium или small
                    onAuth={handleTelegramAuth}
                    className="custom-telegram-button"
                />
            </div>
            <div className='w-full'>

            </div>

        </>
    )
}

export default RegistrationPage