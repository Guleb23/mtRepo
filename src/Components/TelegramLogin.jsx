import { useEffect } from 'react';

const TelegramLogin = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?7';
        script.setAttribute('data-telegram-login', 'esgiktelegramm_bot'); // Имя бота
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-auth-url', 'https://guleb23-webapplication2-c213.twc1.net/auth/telegram');
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
