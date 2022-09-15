import { BUY_CAKE } from "./todoTypes";
import { TodoModal } from "../models";
import { staticTodo } from "../mock-data/todo";
export interface todoList {
  tasks: TodoModal[];
}
const initialState = {
  tasks: staticTodo,
};

//(previousState, action) => newState
const todoReducer = (state: todoList = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default todoReducer;
