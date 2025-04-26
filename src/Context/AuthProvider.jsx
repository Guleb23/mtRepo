import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        const role = localStorage.getItem("role");

        if (token && id && id) {
            // Восстанавливаем данные аутентификации
            setAuth({ token, id, role });
            setLoading(false);
        }
    }, []);
    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;