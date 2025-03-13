import React from 'react'
import axsios from '../api/axsios'

const DocumentCard = ({ title, id, onDelete }) => {

    const handleDownload = async () => {
        const token = localStorage.getItem("token")
        try {
            // Вызываем API-метод для скачивания файла
            const response = await axsios({
                method: 'GET',
                url: `/downloadDocument/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`, // Передаем токен в заголовке
                },
                responseType: 'blob', // Указываем, что ожидаем бинарные данные (файл)
            });

            // Проверяем, что данные — это Blob
            if (!(response.data instanceof Blob)) {
                throw new Error('Сервер вернул данные в неправильном формате.');
            }

            // Проверяем, что файл не пустой
            if (response.data.size === 0) {
                throw new Error('Файл пустой.');
            }

            // Имя файла по умолчанию
            let fileName = 'document.pdf';

            // Если имя файла передается в заголовке "Content-Disposition"
            const contentDisposition = response.headers['content-disposition'];
            if (contentDisposition && contentDisposition.includes('filename=')) {
                fileName = contentDisposition
                    .split('filename=')[1]
                    .split(';')[0]
                    .replace(/['"]/g, ''); // Извлекаем имя файла из заголовка
            }

            // Создаем ссылку для скачивания
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); // Указываем имя файла
            document.body.appendChild(link);
            link.click();

            // Очищаем ссылку
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Ошибка при скачивании файла:', error);
            alert('Не удалось скачать файл. ' + error.message);
        }
    }

    const handleDelete = async () => {
        axsios.delete(`/deleteDocument/${id}`).then((resp) => {
            if (resp.status == "200") {

                alert("Вы успешно удалили документ");
                onDelete(id);
            }

        }).catch((err) => {
            console.log(err);

        })
    }


    return (
        <div className='flex border-[#D5DEE7] border  bg-[#F7FAFC] rounded-xl px-3 py-4 items-center gap-5'>
            <p className='flex-1'>{title}</p>
            <button onClick={handleDownload} className='border-[#1A80E5] border-2 rounded-xl flex items-center gap-2 px-2 py-2'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12L12 16M12 16L16 12M12 16V8M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#1A80E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className='text-[#1A80E5] font-bold'>PDF</p>

            </button>
            <button onClick={handleDelete} className='border-[#f73838] border-2 rounded-xl flex items-center gap-2 px-2 py-2'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6" stroke="#f73838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>


            </button>
        </div>
    )
}

export default DocumentCard
