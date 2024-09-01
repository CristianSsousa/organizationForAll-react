import { AxiosResponse } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/axios";

export default function LoginScreen() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    document.title = "Login";
    const navigate = useNavigate();

    const [username, setUsername] = useState("ADMIN");
    const [password, setPassword] = useState("12345");

    const onClick: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        if (!username || !password) {
            alert("Please fill in all fields");
            return;
        }

        const data = { username, password };
        console.log("Sending data:", data);
        console.log("Base URL:", BASE_URL);

        try {
            const response: AxiosResponse = await api.post(
                "/api/auth/login",
                data
            );
            console.log("Login successful:", response);
            console.log(document.cookie);
            navigate("/home");
        } catch (error: any) {
            console.error("Login failed:", error);
            const errorMessage =
                error.response?.data ||
                "Login failed. Please check your credentials.";
            alert(errorMessage);
        }
    };

    return (
        <div className="flex-1 flex w-full bg-gray-800 justify-center items-center p-2">
            <div className="bg-white min-w-80 w-full max-w-96 h-64 rounded-lg justify-center items-center p-4">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <form className="flex flex-col space-y-4" onSubmit={onClick}>
                    <div className="flex flex-col">
                        <label
                            htmlFor="username"
                            className="text-sm font-semibold"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="password"
                            className="text-sm font-semibold"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-700 text-white rounded-full p-2 font-semibold"
                    >
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    );
}
