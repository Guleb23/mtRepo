import { useEffect, useState } from "react";
import axios from "axios";

const TelegramLogin = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-widget.js?7";
        script.setAttribute("data-telegram-login", "esgiktelegramm_bot");
        script.setAttribute("data-size", "large");
        script.setAttribute("data-auth-url", "https://localhost:5001/auth/telegram");
        script.setAttribute("data-request-access", "write");
        script.async = true;

        document.getElementById("telegram-login-button").appendChild(script);

        return () => {
            document.getElementById("telegram-login-button").removeChild(script);
        };
    }, []);

    const requestPhoneNumber = () => {
        window.Telegram.WebApp.requestContact({
            success: (contact) => {
                console.log("Phone:", contact.phone_number);
                axios.post("https://localhost:5001/auth/telegram/phone", {
                    phone: contact.phone_number,
                    userId: userData?.id
                });
            },
            fail: (error) => console.error("Error requesting phone:", error)
        });
    };

    return (
        <div>
            <div id="telegram-login-button"></div>
            {userData && (
                <div>
                    <h2>Добро пожаловать, {userData.firstName}!</h2>
                    <p>ID: {userData.id}</p>
                    <p>Username: {userData.username}</p>
                    <button onClick={requestPhoneNumber}>Отправить номер</button>
                </div>
            )}
        </div>
    );
};

export default TelegramLogin;