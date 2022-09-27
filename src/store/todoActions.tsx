import { TodoModal } from "../models";
import {
  ADD_TODO,
  DELETE_TODO,
  MARK_DONE_TODO,
  EDIT_TODO,
  LOGIN_CHECK,
} from "./actionTypes";

export const loginTodoAction = (data: boolean) => {
  return {
    type: LOGIN_CHECK, // returned type property
    payload: data,
  };
};

export const addTodoAction = (data: TodoModal) => {
  return {
    type: ADD_TODO, // returned type property
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
