import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { auth } = useAuth();
    const [role, setRole] = useState();
    useEffect(() => {
        setRole(localStorage.getItem(role));
    }, [])
    if (!auth?.role || !allowedRoles.includes(auth.role) || !role) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;