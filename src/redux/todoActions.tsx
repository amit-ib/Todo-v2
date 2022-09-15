import { TodoModal } from "../models";
export const deleteTodo = (data: TodoModal) => {
  console.log("deleteTodo", data);
  return {
    type: "DELETE_TODO", // returned type property
    payload: data,
  };
};
