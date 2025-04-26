import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        const role = localStorage.getItem("role");

        if (token && id && role) {
            // Восстанавливаем данные аутентификации
            setAuth({ token, id, role });
        } else {
            setAuth({}); // Clear auth state if no tokens
            navigate("/login");
        }
        setLoading(false); // Always set loading to false after check
    }, [navigate]); // Add navigate to dependencies

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;