import { TodoModal, CategoryModal, StatusModal } from "../models";
import {
  ADD_TODO,
  DELETE_TODO,
  SET_TODOS,
  SET_LOGIN_STATUS,
  SET_CATEGORIES,
  SET_STATUS,
  SET_FILTERED_TASK,
} from "./actionTypes";
export interface statesModal {
  tasks: TodoModal[] | [];
  isLogedin: boolean;
  categories: CategoryModal[] | [];
  status: StatusModal[] | [];
  filteredList: TodoModal[] | [];
}
const initialState = {
  tasks: [],
  isLogedin: false,
  categories: [],
  status: [],
  filteredList: [],
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
    case SET_FILTERED_TASK:
    case SET_TODOS:
    case SET_CATEGORIES:
    case SET_STATUS:
      return {
        ...state,
        [action.type]: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
