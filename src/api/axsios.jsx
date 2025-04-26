import axios from "axios";

const axsios = axios.create({

    baseURL: 'https://guleb23-webapplication2-a40c.twc1.net/api/'
})


axsios.interceptors.response.use(
    (response) => {
        // Если ответ успешный, просто возвращаем его
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Обработка ошибки 401
            console.error('Unauthorized: Redirecting to login...');

            // Перенаправляем на страницу входа
            window.location.href = '/login';

            // Очищаем токен (если он есть)
            localStorage.removeItem('authToken');
        }
        return Promise.reject(error);
    }
);

export default axsios;