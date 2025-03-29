import { useEffect, useState } from "react";
import axios from "axios";

const TelegramLogin = ({ setUserDate }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-widget.js?7";
        script.setAttribute("data-telegram-login", "esgiktelegramm_bot"); // Заменить на имя своего бота
        script.setAttribute("data-size", "large");
        script.setAttribute("data-request-access", "write");
        script.async = true;

        // Обработчик для получения данных после успешной авторизации
        window.telegramLoginCallback = async (authData) => {
            console.log("Auth Data:", authData);
            try {

                setUserDate(response.data);
                setUserData(response.data);

                // Отправляем сообщение с запросом на номер телефона
                await axios.post(`https://api.telegram.org/bot7593576707:AAFfwzMnHc6eUpyrZVrWhJokJg_NdK4LcQs/sendMessage`, {
                    chat_id: authData.id,
                    text: "👋 Пожалуйста, отправьте ваш номер телефона для завершения авторизации:",
                    reply_markup: {
                        keyboard: [
                            [
                                {
                                    text: "📱 Отправить номер телефона",
                                    request_contact: true
                                }
                            ]
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                });

                console.log("Сообщение с запросом на номер телефона отправлено!");
            } catch (error) {
                console.error("Ошибка при отправке данных или сообщения:", error);
            }
        };

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
