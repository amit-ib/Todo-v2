import {
  TodoModal,
  CategoryModal,
  StatusModal,
  StatusCountModal,
} from "../models";
import {
  ADD_TODO,
  DELETE_TODO,
  SET_TODOS,
  SET_LOGIN_STATUS,
  SET_CATEGORIES,
  SET_STATUS,
  SET_STATUS_COUNT,
  EDIT_TODO,
} from "./actionTypes";
export interface statesModal {
  tasks: TodoModal[] | [];
  statusCount: StatusCountModal | null;
  isLogedin: boolean;
  categories: CategoryModal[] | [];
  status: StatusModal[] | [];
  editTask: TodoModal | null;
}
const initialState = {
  tasks: [],
  statusCount: null,
  isLogedin: false,
  categories: [],
  status: [],
  editTask: null,
};

const todoReducer = (state: statesModal = initialState, action: any) => {
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
        ...state,
        tasks: updatedTodos,
      };

    case DELETE_TODO:
      let remainingTasks = state.tasks.filter(
        (todo) => todo.id !== action.payload.id
      );
      return {
        ...state,
        tasks: remainingTasks,
      };
    case SET_TODOS:
    case SET_CATEGORIES:
    case SET_STATUS:
    case EDIT_TODO:
    case SET_STATUS_COUNT:
      return {
        ...state,
        [action.type]: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
