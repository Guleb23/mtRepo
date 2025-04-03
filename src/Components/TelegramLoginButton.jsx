import React, { useEffect } from 'react';

const TelegramLoginButton = ({
    botName,
    buttonSize = 'medium',
    requestAccess = '',
    onAuth,
    className
}) => {
    useEffect(() => {
        // Удаляем предыдущий обработчик, если был
        window.onTelegramAuth = undefined;

        // Создаем скрипт для виджета Telegram
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.async = true;
        script.setAttribute('data-telegram-login', botName);
        script.setAttribute('data-size', buttonSize);
        script.setAttribute('data-onauth', 'onTelegramAuth(user)');
        script.setAttribute('data-request-access', 'write');
        // Добавляем скрипт в DOM
        const container = document.getElementById('telegram-login-container');
        if (container) {
            container.appendChild(script);
        }

        // Устанавливаем обработчик авторизации
        window.onTelegramAuth = onAuth;


        return () => {
            // Удаляем скрипт при размонтировании компонента
            if (container && script.parentNode === container) {
                container.removeChild(script);
            }
        };
    }, [botName, buttonSize, requestAccess, onAuth]);

    return <div id="telegram-login-container" className={className} />;
};

export default TelegramLoginButton;