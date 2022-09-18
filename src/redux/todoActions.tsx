import { TodoModal } from "../models";
export const addTodo = (data: TodoModal) => {
    return {
      type: "ADD_TODO", // returned type property
      payload: data,
    };
  };

  export const deleteTodo = (data: TodoModal) => {
    return {
      type: "DELETE_TODO",
      payload: data,
    };
  };

  export const markDoneTodo = (data: TodoModal) => {
    return {
      type: "MARK_DONE_TODO", 
      payload: data,
    };
  };