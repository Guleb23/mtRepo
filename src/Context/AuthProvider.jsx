import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const id = Number(localStorage.getItem("id"));
        const role = Number(localStorage.getItem("role"));

        if (token && id && role) {
            setAuth({ token, id, role });

            // Если роль менеджера и мы не на manager
            if (role === 2 && location.pathname !== "/manager") {
                navigate("/manager", { replace: true });
            }
        } else {
            setAuth({});
        }
        setLoading(false);
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
