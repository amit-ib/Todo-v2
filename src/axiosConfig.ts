import axios from "axios";
const AUTH_TOKEN = window.localStorage.getItem("accessToken");
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;

export default axiosInstance;
