import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    const user = { loggedIn: false }; // Troque pela lógica de autenticação real
    return user && user.loggedIn;
};

const PrivateRoutes = () => {
    const isAuth = useAuth();

    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
