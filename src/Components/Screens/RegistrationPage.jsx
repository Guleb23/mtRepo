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

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        paymentMethodId: 1,
        getDocsSposobId: 1,
    });

    const [codeSent, setCodeSent] = useState(false);
    const [code, setCode] = useState("");

    const sendTelegramCode = async () => {
        try {
            const response = await axios.post("https://guleb23-webapplication2-a40c.twc1.net/auth/send-code", {
                phone: user.phone
            });
            if (response.status === 200) {
                setCodeSent(true);
                alert("Код отправлен в Telegram!");
            }
        } catch (err) {
            console.error("Ошибка при отправке кода:", err);
            alert("Не удалось отправить код. Убедитесь, что вы начали чат с ботом.");
        }
    };

    const verifyTelegramCode = async () => {
        try {
            const response = await axios.post("https://guleb23-webapplication2-a40c.twc1.net/auth/verify-code", {
                phone: user.phone,
                code: code
            });

            if (response.status === 200) {
                setAuth({ token: response.data.token, id: response.data.id });
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("id", response.data.id);
                navigate("/profile");
            }
        } catch (err) {
            console.error("Ошибка при проверке кода:", err);
            alert("Неверный код или ошибка на сервере");
        }
    };

    const handleClick = async () => {
        if (user.phone.length < 10) {
            alert("Uncorrect phone");
        } else {
            sendTelegramCode();
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
            {!codeSent ? (
                <CustomBtn onClick={handleClick} customStyles={`w-full  h-10 !bg-[#1A80E5] text-white`} title={`Регистрация`} />
            ) : (
                <div className="flex flex-col gap-2 w-full">
                    <input
                        className="border rounded p-2"
                        type="text"
                        placeholder="Введите код из Telegram"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <CustomBtn onClick={verifyTelegramCode} customStyles={`w-full h-10 !bg-[#1A80E5] text-white`} title={`Подтвердить`} />
                </div>
            )}
        </>
    );
};

export default RegistrationPage;
