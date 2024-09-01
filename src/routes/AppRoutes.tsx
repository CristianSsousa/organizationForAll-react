import { Route, Routes } from "react-router-dom";
import HomeScreen from "../screens/home/HomeScreen";
import LoginScreen from "../screens/login/LoginScreen";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/home" element={<HomeScreen />} />
        </Routes>
    );
};

export default AppRoutes;
