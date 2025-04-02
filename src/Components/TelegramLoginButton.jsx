import React, { useEffect, useRef } from 'react';
import '../TelegramAuthButton.css'; // Стили для кнопки

const TelegramAuthButton = ({ botName, onAuth }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        // Функция для обработки авторизации
        window.onTelegramAuth = (user) => {
            if (onAuth) onAuth(user);
        };

        // Создаем iframe с виджетом Telegram
        const initTelegramWidget = () => {
            if (!botName || !buttonRef.current) return;

            const iframe = document.createElement('iframe');
            iframe.src = `https://oauth.telegram.org/auth?bot_id=${botName}&origin=${encodeURIComponent(window.location.origin)}&embed=1&request_access=write`;
            iframe.frameBorder = "0";
            iframe.style.width = "100%";
            iframe.style.height = "40px";
            iframe.title = "Telegram Login";

            buttonRef.current.innerHTML = '';
            buttonRef.current.appendChild(iframe);

            // Обработчик сообщений от виджета
            window.addEventListener('message', (event) => {
                if (event.origin !== 'https://oauth.telegram.org') return;

                if (event.data.event === 'auth_user') {
                    window.onTelegramAuth(event.data.user);
                }
            });
        };

        initTelegramWidget();

        return () => {
            window.removeEventListener('message', window.onTelegramAuth);
            delete window.onTelegramAuth;
        };
    }, [botName, onAuth]);

    return <div ref={buttonRef} className="telegram-auth-button"></div>;
};

export default TelegramAuthButton;