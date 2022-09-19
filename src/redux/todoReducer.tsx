import { TodoModal } from "../models";
import { staticTodo } from "../mock-data/todo";
//import { v4 as uuidv4 } from "uuid";
import moment from "moment";
export interface todoList {
  tasks: TodoModal[];
}
const initialState = {
  tasks: staticTodo,
};

//(previousState, action) => newState
const todoReducer = (state: todoList = initialState, action: any) => {
  switch (action.type) {
    case "ADD_TODO":
      const updatedTodos = [...state.tasks];
      if (action.payload) {
        updatedTodos.push(action.payload);
      }

      return {
        ...state, // copy origenal state and update only required
        tasks: updatedTodos,
      };

    case "DELETE_TODO":
      let remainingTasks = state.tasks.filter(
        (todoItem) => todoItem.id !== action.payload.id
      );
      return {
        ...state, // copy origenal state and update only required
        tasks: remainingTasks,
      };

    case "MARK_DONE_TODO":
      let todoList = [...state.tasks];
      todoList.forEach((item) => {
        if (item.id === action.payload.id) {
          item.isDone = !item.isDone;
        }
      });
      return {
        ...state,
        tasks: todoList,
      };
    default:
      return state;
  }
};

export default todoReducer;
