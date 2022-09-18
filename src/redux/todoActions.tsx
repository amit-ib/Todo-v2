import { TodoModal } from "../models";
export const addTodo = (data: TodoModal) => {
    return {
      type: "ADD_TODO", // returned type property
      payload: data,
    };
  };

  export const deleteTodo = (data: TodoModal) => {
    console.log("deleteTodo", data);
    return {
      type: "DELETE_TODO", // returned type property
      payload: data,
    };
  };