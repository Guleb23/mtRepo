import React, { useState } from 'react'
import CustomBtn from '../CustomBtn'
import PhoneInput from '../PhoneInput'
import axsios from '../../api/axsios';
import { useNavigate } from 'react-router-dom';
import { FaTelegramPlane } from "react-icons/fa";




const RegistrationPage = () => {


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
    const botUsername = "esgikss_bot";
    const handleClickTg = () => {
        // Переход к боту
        window.open(`https://t.me/${botUsername}`, '_blank');
    };
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
            </div>
            <div className='w-full flex items-center '>
                <p className='text-[#4F7396] text-[14px] flex-1'>Можете пройти регистрацию через нашего бота в телеграмм!</p>
                <CustomBtn icon={<FaTelegramPlane />} onClick={handleClickTg} customStyles={`!w-fit h-10 !bg-[#1A80E5] text-white`} title={`Регистрация через телеграмм`} />
            </div>

        </>
    )
}

export default RegistrationPage