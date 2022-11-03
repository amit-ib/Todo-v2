import {
  TodoModal,
  CategoryModal,
  StatusModal,
  TodoConfigModal,
} from "../models";
import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  SET_TODOS,
  SET_LOGIN_STATUS,
  SET_CATEGORIES,
  SET_STATUS,
  SET_STATUS_COUNT,
  SET_TODO_CONFIG,
} from "./actionTypes";

export const loginTodoAction = (data: boolean) => {
  return {
    type: SET_LOGIN_STATUS, // returned type property
    payload: data,
  };
};

export const setIsLogedIn = (data: boolean) => {
  return {
    type: SET_LOGIN_STATUS, // returned type property
    payload: data,
  };
};

export const addTodoAction = (data: TodoModal) => {
  return {
    type: ADD_TODO, // returned type property
    payload: data,
  };
};

export const setTodoAction = (data: TodoModal[]) => {
  return {
    type: SET_TODOS,
    payload: data,
  };
};

export const setCategoryAction = (data: CategoryModal[]) => {
  return {
    type: SET_CATEGORIES,
    payload: data,
  };
};

export const setStatusAction = (data: StatusModal[]) => {
  return {
    type: SET_STATUS,
    payload: data,
  };
};

export const setStatusCountAction = (data: TodoModal[]) => {
  return {
    type: SET_STATUS_COUNT,
    payload: data,
  };
};

export const deleteTodoAction = (data: TodoModal) => {
  return {
    type: DELETE_TODO, // returned type property
    payload: data,
  };
};

export const editTodoAction = (data: TodoModal | null) => {
  return {
    type: EDIT_TODO,
    payload: data,
  };
};

export const setTodoConfigAction = (data: TodoConfigModal[]) => {
  return {
    type: SET_TODO_CONFIG,
    payload: data,
  };
};
