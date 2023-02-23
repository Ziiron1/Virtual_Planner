import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: "https://plannervirtual.onrender.com",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token");

        if (token) {
            config.headers["authorization"] = `${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
