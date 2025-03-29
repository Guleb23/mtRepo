import { useEffect, useState } from "react";
import axios from "axios";

const TelegramLogin = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-widget.js?7";
        script.setAttribute("data-telegram-login", "esgiktelegramm_bot"); // Замените на имя вашего бота
        script.setAttribute("data-size", "large");
        script.setAttribute("data-request-access", "write");
        script.async = true;



        console.log(userData);

        const loginContainer = document.getElementById("telegram-login-button");
        if (loginContainer) {
            loginContainer.appendChild(script);
        }

        return () => {
            if (loginContainer && script) {
                loginContainer.removeChild(script);
            }
        };
    }, []);

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
