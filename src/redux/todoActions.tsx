import { TodoModal } from "../models";
import { ADD_TODO, DELETE_TODO, MARK_DONE_TODO } from "./actionList";
export const addTodo = (data: TodoModal) => {
  return {
    type: ADD_TODO, // returned type property
    payload: data,
  };
};

export const deleteTodo = (data: TodoModal) => {
  console.log("deleteTodo", data);
  return {
    type: DELETE_TODO, // returned type property
    payload: data,
  };
};

export const markDoneTodo = (data: TodoModal) => {
  return {
    type: MARK_DONE_TODO,
    payload: data,
  };
};
