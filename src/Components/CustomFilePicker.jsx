import React, { useRef, useState } from 'react'

const CustomFilePicker = ({ customStyles, setFile }) => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null); // Состояние для хранения выбранного файла

    // Обработчик клика по кастомной кнопке
    const handleButtonClick = () => {
        fileInputRef.current.click(); // Программно вызываем клик по скрытому input
    };
    const handleRemoveFile = () => {
        setSelectedFile(null); // Удаляем файл из состояния
    };

    // Обработчик выбора файла
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Выбран файл:', file.name);
            setFile(file);
            setSelectedFile(file);
        }
    }


    // Проверка, является ли файл изображением
    const isImage = selectedFile && selectedFile.type.startsWith('image/');

    // Проверка, является ли файл PDF
    const isPDF = selectedFile && selectedFile.type === 'application/pdf';
    return (
        <div className={`${customStyles && customStyles}`}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            {selectedFile ? (
                // Если файл выбран, отображаем его превью или иконку PDF
                <div className="border border-[#1A80E5] border-dashed w-40 h-12 flex items-center justify-center gap-2 relative">
                    {isImage ? (
                        // Превью для изображений
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Выбранный файл"
                            className="w-full h-full object-cover"
                        />
                    ) : isPDF ? (
                        // Иконка или текст для PDF
                        <div className="text-[#1A80E5] flex flex-col items-center">
                            <img
                                width={25}
                                height={25}
                                src="../pdf.svg" // Иконка для PDF
                                alt="PDF файл"
                            />
                            <p className="text-xs !text-black">{selectedFile.name}</p>
                        </div>
                    ) : (
                        // Для других типов файлов
                        <div className="text-[#1A80E5]">Файл</div>
                    )}
                    <button
                        onClick={handleRemoveFile}
                        className="absolute top-0 right-0  text-black rounded-full w-5 h-5 flex items-center justify-center"
                    >
                        &times;
                    </button>
                </div>
            ) :
                (<button onClick={handleButtonClick} className='w-full h-full'>
                    <div className={` ${customStyles && customStyles}  border border-[#1A80E5] border-dashed w-40 h-12 flex items-center justify-center gap-2`}>
                        <img width={25} height={25} src='../Images/imagePic.svg' />
                        <p className='text-xs text-[#1A80E5]'>
                            Выбрать фото
                        </p>


                    </div>

                </button>)
            }

            {/* Дополнительный интерфейс (например, отображение имени файла) */}
        </div>
    )
}

export default CustomFilePicker
