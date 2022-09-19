import { TodoModal } from "../models";
export const deleteTodo = (data: TodoModal) => {
  return {
    type: "DELETE_TODO", // returned type property
    payload: data,
  };
};

export const doneTodo = (data: TodoModal) => {
  return {
    type: "DONE_TODO",
    payload: data,
  };
};

export const addTodo = (data: TodoModal) => {
  return {
    type: "ADD_TODO",
    payload: data,
  };
};
