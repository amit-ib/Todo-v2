import { TodoModal } from "../models";
import {
  actionAddTask,
  actionDeleteTask,
  actionCompleteTask,
} from "./actionList";
export const addTodo = (data: TodoModal) => {
  return {
    type: actionAddTask, // returned type property
    payload: data,
  };
};

export const deleteTodo = (data: TodoModal) => {
  console.log("deleteTodo", data);
  return {
    type: actionDeleteTask, // returned type property
    payload: data,
  };
};

export const markDoneTodo = (data: TodoModal) => {
  return {
    type: actionCompleteTask,
    payload: data,
  };
};
