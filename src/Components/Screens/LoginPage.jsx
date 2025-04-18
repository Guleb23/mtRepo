import React, { useState } from 'react';
import CustomInput from '../CustomInput';
import PhoneInput from '../PhoneInput';
import CustomBtn from '../CustomBtn';
import axsios from '../../api/axsios';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = '/login';

const LoginPage = () => {
    const { setAuth } = useAuth();

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
            localStorage.setItem("role", response.data.role);
            navigate("/profile");
        } catch (error) {
            if (error.status == "404")
                alert("Неправильный логин или пароль")
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
            </form>

        </div>
    );
};

export default LoginPage;


