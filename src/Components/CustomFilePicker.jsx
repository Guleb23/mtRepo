import React, { useRef } from 'react'

const CustomFilePicker = () => {
    const fileInputRef = useRef(null);

    // Обработчик клика по кастомной кнопке
    const handleButtonClick = () => {
        fileInputRef.current.click(); // Программно вызываем клик по скрытому input
    };

    // Обработчик выбора файла
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Выбран файл:', file.name);
            // Здесь можно добавить логику для обработки файла
        }
    }
    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            <button onClick={handleButtonClick}>
                <div className='border border-[#1A80E5] border-dashed w-40 h-12 flex items-center justify-center gap-2 '>
                    <img width={25} height={25} src='../Images/imagePic.svg' />
                    <p className='text-xs text-[#1A80E5]'>
                        Выбрать фото
                    </p>


                </div>

            </button>

            {/* Дополнительный интерфейс (например, отображение имени файла) */}
        </div>
    )
}

export default CustomFilePicker
