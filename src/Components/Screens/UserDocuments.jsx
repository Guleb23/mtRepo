import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import CustomBtn from '../CustomBtn';
import axsios from '../../api/axsios';
import DocumentCard from '../DocumentCard';
import { useNavigate } from 'react-router-dom';



const UserDocuments = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const navigator = useNavigate();
    useEffect(() => {

        const id = localStorage.getItem("id")
        const token = localStorage.getItem("token")

        if (!token) {
            navigator("/documents/noneuser");
            return;
        }
        try {
            axsios.get(`/documents/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((resp) => setData(resp.data))

        } catch (err) {
            navigate("/noneuser")

        } finally {
            setLoading(false)
        }
    }, [showModal])
    console.log(data);


    if (loading) {
        return (
            <p>loading</p>
        )
    }
    const handleViewDocument = async (documentId) => {

        try {
            const token = localStorage.getItem("token");
            const response = await axsios.get(`/downloadDocument/${documentId}`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob' // Указываем, что ожидаем бинарные данные (файл)
            });

            const fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            window.open(fileURL, '_blank'); // Открываем в новой вкладке
        } catch (error) {
            console.error("Ошибка при открытии документа", error);
        }
    };
    const toggleShowModal = () => {
        setShowModal(!showModal);
    };

    const handleClientDelete = (documentId) => {
        setData((prevData) => prevData.filter((item) => item.id !== documentId));
    };

    return (
        <div>
            <Modal show={showModal} onCloseButtonClick={toggleShowModal} />
            <CustomBtn onClick={toggleShowModal} customStyles={`!bg-[#1A80E5] text-white`} title={`Загрузить`} />

            <div className='py-6 flex flex-col gap-5'>
                {data?.map((item) => (
                    <DocumentCard handleViewDocument={handleViewDocument} onDelete={handleClientDelete} title={item.title} key={item.id} id={item.id} />
                ))}
            </div>
        </div>
    )
}

export default UserDocuments
