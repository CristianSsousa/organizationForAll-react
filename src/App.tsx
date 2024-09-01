import { useEffect } from "react";
import Routes from "./routes";

function App() {
    useEffect(() => {
        //axios.interceptors.request.use((request) => {
        //    console.log("request", request);
        //    return request;
        //});
        //axios.interceptors.response.use((response) => {
        //    console.log("response", response);
        //    return response;
        //});
    }, []);

    return <Routes />;
}

export default App;
