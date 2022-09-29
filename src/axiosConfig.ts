import axios from "axios";
const AUTH_TOKEN = window.localStorage.getItem("accessToken");
const instance = axios.create({
  baseURL: process.env.REACT_APP_LOGIN_API,
});

if (AUTH_TOKEN)
  instance.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;

export default instance;
