import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    useEffect(() => {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");

        if (token && id) {
            // Восстанавливаем данные аутентификации
            setAuth({ token, id });
        }
    }, []);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;