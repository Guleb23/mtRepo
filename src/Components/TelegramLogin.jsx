import { useEffect, useState } from "react";
import axios from "axios";

const TelegramLogin = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-widget.js?7";
        script.setAttribute("data-telegram-login", "esgiktelegramm_bot"); // Имя бота
        script.setAttribute("data-size", "large");
        script.setAttribute("data-request-access", "write");
        script.setAttribute("data-userpic", "true");
        script.async = true;

        script.onload = () => {
            if (window.Telegram && window.Telegram.Login) {
                window.Telegram.Login.auth = (user) => {
                    setUserData(user);
                    sendDataToBackend(user);
                };
            }
        };

        document.getElementById("telegram-login-button").appendChild(script);

        return () => {
            document.getElementById("telegram-login-button").removeChild(script);
        };
    }, []);

    const sendDataToBackend = async (user) => {
        try {
            const response = await axios.get("https://guleb23-webapplication2-a40c.twc1.net/auth/telegram", {
                params: {
                    id: user.id,
                    first_name: user.first_name,
                    username: user.username,
                    hash: user.hash,
                },
            });
            console.log("Сервер ответил:", response.data);
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
        }
    };

    return (
        <div>
            <div id="telegram-login-button"></div>
            {userData && (
                <div>
                    <h2>Добро пожаловать, {userData.first_name}!</h2>
                    <p>ID: {userData.id}</p>
                    <p>Username: {userData.username}</p>
                    {userData.photo_url && (
                        <img src={userData.photo_url} alt="User Avatar" width="100" />
                    )}
                </div>
            )}
        </div>
    );
};

export default TelegramLogin;
