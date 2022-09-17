import { TodoModal } from "../models";
export const addTodo = (data: TodoModal) => {
    return {
      type: "ADD_TODO", // returned type property
      payload: data,
    };
  };
