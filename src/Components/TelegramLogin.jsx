import { useEffect } from 'react';

const TelegramLogin = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?7';
        script.setAttribute('data-telegram-login', 'YOUR_BOT_USERNAME'); // Имя бота
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-auth-url', 'https://your-backend.com/auth/telegram');
        script.setAttribute('data-request-access', 'write');
        script.async = true;

        document.getElementById('telegram-login-button').appendChild(script);

        return () => {
            document.getElementById('telegram-login-button').removeChild(script);
        };
    }, []);

    return <div id="telegram-login-button"></div>;
};

export default TelegramLogin;
