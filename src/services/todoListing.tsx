import axios from "axios";
export const accessToken = window.localStorage.getItem("accessToken");

export const getTodoList = () => {
  return axios.get(`${process.env.REACT_APP_LOGIN_API}/todos`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
