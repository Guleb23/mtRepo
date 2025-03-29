import { useEffect } from "react";

const TelegramLogin = ({ onAuth }) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-widget.js?7";
        script.setAttribute("data-telegram-login", "esgiktelegramm_bot"); // Укажите имя вашего бота
        script.setAttribute("data-size", "large");
        script.setAttribute("data-request-access", "write");
        script.async = true;

        script.onload = () => {
            if (window.Telegram && window.Telegram.Login) {
                window.Telegram.Login.auth = (user) => {
                    console.log("✅ Авторизация прошла успешно!", user);
                    onAuth(user);  // Передаем данные в родительский компонент
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
