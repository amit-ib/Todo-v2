import { TodoModal } from "../models";
import { staticTodo } from "../mock-data/todo";
import { ADD_TODO, DELETE_TODO, MARK_DONE_TODO } from "./actionList";
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
    case ADD_TODO:
      const updatedTodos = [...state.tasks];
      if (action.payload) {
        updatedTodos.push(action.payload);
      }

      return {
        ...state, // copy origenal state and update only required
        tasks: updatedTodos,
      };

    case DELETE_TODO:
      let remainingTasks = state.tasks.filter(
        (todo) => todo.id !== action.payload.id
      );
      return {
        ...state, // copy origenal state and update only required
        tasks: remainingTasks,
      };

    case MARK_DONE_TODO:
      const todoList: TodoModal[] = [...state.tasks];
      const todoIndex: number = todoList.findIndex(
        (todo) => todo.id === action.payload.id
      );
      const selectedTodo: TodoModal = todoList[todoIndex];
      selectedTodo.isDone = !selectedTodo.isDone;
      return {
        ...state,
        tasks: todoList,
      };
    default:
      return state;
  }
};

export default todoReducer;
