import moment from "moment";

export const dateConverter = (date: Date) => {
  return moment(date).format("DD/MM/YYYY");
};

export const dateConverterYMD = (date: Date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const loggedInUserData = () => {
  return window.localStorage.getItem("userData")
    ? JSON.parse(window.localStorage.getItem("userData") || "{}")
    : "";
};
