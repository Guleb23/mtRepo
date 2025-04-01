import React, { useEffect } from 'react';

const TelegramLoginButton = ({ botName, onAuth }) => {
    useEffect(() => {
        const loadTelegramScript = () => {
            const script = document.createElement('script');
            script.src = "https://telegram.org/js/telegram-widget.js?22";
            script.async = true;
            script.setAttribute('data-telegram-login', botName);
            script.setAttribute('data-size', 'large');
            script.setAttribute('data-onauth', 'onTelegramAuth(user)');
            script.setAttribute('data-request-access', 'write');
            document.body.appendChild(script);

            window.onTelegramAuth = (user) => {
                onAuth(user);
            };
        };

        loadTelegramScript();

        return () => {
            const script = document.querySelector('script[src*="telegram-widget"]');
            if (script) {
                document.body.removeChild(script);
            }
            delete window.onTelegramAuth;
        };
    }, [botName, onAuth]);

    return (
        <div
            className="telegram-login-button"
            id="telegram-login-button"
        />
    );
};

export default TelegramLoginButton;