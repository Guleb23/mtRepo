import React, { useState } from 'react'

import CustomBtn from '../CustomBtn'
import PhoneInput from '../PhoneInput'
import axsios from '../../api/axsios';
import { useNavigate } from 'react-router-dom';
import TelegramLogin from '../TelegramLogin';


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

    const [data, setData] = useState({});



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
            <PhoneInput phone={user.phone} handleChange={(e) => { setUser({ ...user, phone: e.target.value }) }} phoneValue={user.Phone} inpId={`userPhone`} name={`Введите свой номер телефона`} />
            <div className='flex flex-1 items-end lg:items-start lg:flex-none '>

                <CustomBtn onClick={handleClick} customStyles={`w-full  h-10 !bg-[#1A80E5] text-white`} title={`Регистрация`} />
                <TelegramLogin />
            </div>
        </>
    )
}

export default RegistrationPage
