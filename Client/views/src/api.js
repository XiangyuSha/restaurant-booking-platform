import axios from "axios";
import API_BASE_URL from "./config";

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Automatically attach the token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;