import { TodoModal } from "../models";
import {
  ADD_TODO,
  DELETE_TODO,
  MARK_DONE_TODO,
  EDIT_TODO,
  SET_TODOS,
  SET_LOGIN_STATUS,
} from "./actionTypes";

export const loginTodoAction = (data: boolean) => {
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

export const deleteTodoAction = (data: TodoModal) => {
  return {
    type: DELETE_TODO, // returned type property
    payload: data,
  };
};

export const markDoneTodoAction = (data: TodoModal) => {
  return {
    type: MARK_DONE_TODO,
    payload: data,
  };
};

export const editTodoAction = (data: TodoModal) => {
  return {
    type: EDIT_TODO,
    payload: data,
  };
};
