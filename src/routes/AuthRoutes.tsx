import { Route } from "react-router-dom";
import HomeScreen from "../screens/home/HomeScreen";
import LoginScreen from "../screens/login/LoginScreen";

const AuthRoutes = () => {
    return (
        <>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/home" element={<HomeScreen />} />
        </>
    );
};

export default AuthRoutes;
