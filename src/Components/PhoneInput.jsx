import React from "react";

const PhoneInput = ({ handleChange, name, inpId, phone }) => {
    // Функция для форматирования номера
    const formatPhoneNumber = (input) => {
        // Убираем все нецифровые символы
        let numbers = input.replace(/\D/g, "");

        // Убеждаемся, что номер начинается с "7"
        if (!numbers.startsWith("7")) {
            numbers = "7" + numbers;
        }

        // Ограничиваем до 11 цифр (стандартный формат РФ)
        numbers = numbers.slice(0, 11);

        // Применяем форматирование +7 (XXX) XXX-XX-XX
        let formatted = "+7 ";
        if (numbers.length > 1) formatted += `(${numbers.slice(1, 4)}`;
        if (numbers.length > 4) formatted += `) ${numbers.slice(4, 7)}`;
        if (numbers.length > 7) formatted += `-${numbers.slice(7, 9)}`;
        if (numbers.length > 9) formatted += `-${numbers.slice(9, 11)}`;

        return formatted;
    };

    // Обработчик изменения ввода
    const handleInputChange = (e) => {
        const formatted = formatPhoneNumber(e.target.value);
        handleChange(formatted);
    };

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={inpId} className="text-[#727376] text-xs">
                {name}
            </label>
            <div className="h-8 bg-[#F7FAFC] border-[#D1DBE8] border rounded-xl">
                <input
                    id={inpId}
                    value={phone}
                    onChange={handleInputChange}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full appearance-none outline-0 px-2 text-xs"
                />
            </div>
        </div>
    );
};

export default PhoneInput;