import { TodoModal } from "../models";
import { staticTodo } from "../mock-data/todo";
import {
  actionAddTask,
  actionDeleteTask,
  actionCompleteTask,
} from "./actionList";
//import { v4 as uuidv4 } from "uuid";
export interface todoList {
  tasks: TodoModal[];
}
const initialState = {
  tasks: staticTodo,
};

//(previousState, action) => newState
const todoReducer = (state: todoList = initialState, action: any) => {
  switch (action.type) {
    case actionAddTask:
      const updatedTodos = [...state.tasks];
      if (action.payload) {
        updatedTodos.push(action.payload);
      }

      return {
        ...state, // copy origenal state and update only required
        tasks: updatedTodos,
      };

    case actionDeleteTask:
      let remainingTasks = state.tasks.filter(
        (todoItem) => todoItem.id !== action.payload.id
      );
      return {
        ...state, // copy origenal state and update only required
        tasks: remainingTasks,
      };

    case actionCompleteTask:
      let todoList = [...state.tasks];
      let todoIndex = todoList.findIndex(
        (element) => element.id === action.payload.id
      );
      todoList[todoIndex].isDone = !todoList[todoIndex].isDone;
      return {
        ...state,
        tasks: todoList,
      };
    default:
      return state;
  }
};

export default todoReducer;
