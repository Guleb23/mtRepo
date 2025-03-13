import React, { useState } from 'react'
import CustomInput from '../CustomInput';
import CustomBtn from '../CustomBtn';
import CustomFilePicker from '../CustomFilePicker';
import axsios from '../../api/axsios';

const Modal = ({ show, onCloseButtonClick }) => {
    const [file, setFile] = useState(null); // Состояние для хранения файла
    const [title, setTitle] = useState(''); // Состояние для хранения названия


    const handleSubmit = async (e) => {
        const id = localStorage.getItem("id")
        const token = localStorage.getItem("token")

        if (!file || !title) {
            alert('Пожалуйста, выберите файл и введите название.');
            return;
        }

        // Создаем объект FormData
        const formData = new FormData();
        formData.append('file', file); // Добавляем файл
        formData.append('title', title); // Добавляем название

        try {
            // Отправляем данные на сервер с помощью axios
            const response = await axsios.post(`/uploadDocument/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                alert('Файл успешно загружен!');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке данных.');
        }
    };

    if (!show) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center">
            <div className=" w-xl  h-80 bg-white rounded-2xl px-8 py-4 flex flex-col gap-4 md:w-xl md:gap-0">
                <div className='flex'>
                    <div className='flex flex-col  flex-1 md:gap-1'>
                        <h1 className='text-sm font-bold md:text-2xl md:font-medium'> Выберите документ </h1>
                        <p className='text-[#8B8E91] font-medium text-sm'>Импорт документов</p>
                    </div>
                    <p onClick={onCloseButtonClick} className='justify-end  text-end align-top'>
                        &times;
                    </p>
                </div>

                <div className='flex h-full gap-3'>
                    <div className='flex-[1_1_40%]  py-2.5 px-2.5 md:flex-[1_1_50%]'>
                        <CustomFilePicker setFile={setFile} customStyles={`w-full h-full`} />
                    </div>
                    <div className='flex flex-col flex-[1_1_60%] gap-3 h-full md:flex-[1_1_50%]'>
                        <p className='font-medium text-sm md:text-xl'>Название документа</p>
                        <CustomInput handleChange={(e) => setTitle(e.target.value)} />
                        <div className='justify-end'>
                            <CustomBtn onClick={handleSubmit} customStyles={`w-full !bg-[#1A80E5] text-white`} title={`Загрузить`} />
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default Modal
