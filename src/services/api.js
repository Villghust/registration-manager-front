import axios from "axios";

const api = axios.create({
    baseURL:
        process.env.NODE_ENV === "production"
            ? process.env.REACT_APP_PRODUCTION_API_URL
            : process.env.REACT_APP_DEV_API_URL,
});

api.interceptors.request.use(async (config) => {
    let userData = window.localStorage.getItem("user");
    if (userData) {
        userData = JSON.parse(userData);
        config.headers.Authorization = `Bearer ${userData.token}`;
    }
    return config;
});

export default api;
