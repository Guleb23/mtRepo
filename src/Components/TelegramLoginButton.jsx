import React, { useEffect, useRef } from 'react';
import '../TelegramAuthButton.css'; // Стили для кнопки
import useTelegramBotId from '../Hooks/useTelegramBotId'

const TelegramAuthButton = ({ botUsername, onAuth }) => {
    const buttonRef = useRef(null);
    const { botId, loading, error } = useTelegramBotId(botUsername);

    useEffect(() => {
        if (!botId || !buttonRef.current) return;

        const handleMessage = (event) => {
            if (event.origin !== 'https://oauth.telegram.org') return;
            if (event.data.event === 'auth_user' && onAuth) {
                onAuth(event.data.user);
            }
        };

        const iframe = document.createElement('iframe');
        iframe.src = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${encodeURIComponent(window.location.origin)}&embed=1&request_access=write`;
        iframe.frameBorder = "0";
        iframe.style.width = "100%";
        iframe.style.height = "40px";
        iframe.title = "Telegram Login";

        buttonRef.current.innerHTML = '';
        buttonRef.current.appendChild(iframe);

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [botId, onAuth]);

    if (loading) return <div>Loading Telegram login...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!botId) return null;

    return <div ref={buttonRef} className="telegram-auth-button"></div>;
};

export default TelegramAuthButton;