import { TodoModal, CategoryModal } from "../models";
import {
  ADD_TODO,
  DELETE_TODO,
  MARK_DONE_TODO,
  EDIT_TODO,
  SET_TODOS,
  SET_LOGIN_STATUS,
  SET_CATEGORIES,
} from "./actionTypes";
export interface statesModal {
  tasks: TodoModal[] | [];
  isLogedin: boolean;
  category: CategoryModal[] | [];
}
const initialState = {
  tasks: [],
  isLogedin: false,
  category: [],
  //status
};

//(previousState, action) => newState
const todoReducer = (state: statesModal = initialState, action: any) => {
  const todoList: TodoModal[] = [...state.tasks];

  switch (action.type) {
    case SET_LOGIN_STATUS:
      return {
        ...state,
        isLogedin: action.payload,
      };

    // case ADD_TODO:
    //   const updatedTodos = [...state.tasks];
    //   if (action.payload) {
    //     updatedTodos.push(action.payload);
    //   }

    //   return {
    //     ...state, // copy origenal state and update only required
    //     tasks: updatedTodos,
    //   };

    // case DELETE_TODO:
    //   let remainingTasks = state.tasks.filter(
    //     (todo) => todo.id !== action.payload.id
    //   );
    //   return {
    //     ...state, // copy origenal state and update only required
    //     tasks: remainingTasks,
    //   };

    // case MARK_DONE_TODO:
    //   const todoIndex: number = todoList.findIndex(
    //     (todo) => todo.id === action.payload.id
    //   );
    //   const selectedTodo: TodoModal = todoList[todoIndex];
    //   selectedTodo.isDone = !selectedTodo.isDone;
    //   return {
    //     ...state,
    //     tasks: todoList,
    //   };

    // case EDIT_TODO:
    //   const taskIndex: number = todoList.findIndex(
    //     (todo) => todo.id === action.payload.id
    //   );
    //   todoList[taskIndex] = action.payload;

    //   return {
    //     ...state,
    //     tasks: todoList,
    //   };

    case SET_TODOS:
      return {
        ...state,
        tasks: action.payload,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
