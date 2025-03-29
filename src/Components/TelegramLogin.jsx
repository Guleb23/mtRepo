import { useEffect } from "react";

const TelegramLogin = ({ setUserData }) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-widget.js?7";
        script.setAttribute("data-telegram-login", "esgiktelegramm_bot");
        script.setAttribute("data-size", "large");
        script.setAttribute("data-request-access", "write");
        script.async = true;

        script.onload = () => {
            if (window.Telegram && window.Telegram.Login) {
                window.Telegram.Login.auth = (user) => {
                    console.log("Пользователь авторизован через Telegram:", user);
                    setUserData(user);  // <-- Передаем данные в RegistrationPage
                };
            }
        };

        document.getElementById("telegram-login-button").appendChild(script);

        return () => {
            document.getElementById("telegram-login-button").removeChild(script);
        };
    }, []);

    return <div id="telegram-login-button"></div>;
};

export default TelegramLogin;
