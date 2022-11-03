import axiosInstance from "../axiosConfig";

export const featchTodoConfig = () => {
  return axiosInstance.get("/config");
};

export const featchToDos = () => {
  return axiosInstance.get("/todos");
};

export const featchCategories = () => {
  return axiosInstance.get("/category");
};

export const featchStatus = () => {
  return axiosInstance.get("/status");
};

export const updateToDos = (id: any, updateData: any) => {
  return axiosInstance.put(`/todo/${id}`, updateData);
};
