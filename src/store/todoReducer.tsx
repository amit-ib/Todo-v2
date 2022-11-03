import {
  TodoModal,
  CategoryModal,
  StatusModal,
  StatusCountModal,
  UsersModal,
  TodoConfigModal,
} from "../models";
import {
  ADD_TODO,
  DELETE_TODO,
  SET_TODOS,
  SET_LOGIN_STATUS,
  SET_CATEGORIES,
  SET_STATUS,
  SET_STATUS_COUNT,
  SET_USERS,
  SET_TODO_CONFIG,
  EDIT_TODO,
} from "./actionTypes";
export interface statesModal {
  tasks: TodoModal[] | [];
  statusCount: StatusCountModal | null;
  isLogedin: boolean;
  categories: CategoryModal[] | [];
  status: StatusModal[] | [];
  users: UsersModal[] | [];
  todoConfig: TodoConfigModal;
  editTask: TodoModal | null;
}
const initialState = {
  tasks: [],
  statusCount: null,
  isLogedin: false,
  categories: [],
  status: [],
  users: [],
  todoConfig: {
    category: [],
    status: [],
    priority: [],
  },
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
    case SET_TODO_CONFIG:
    case SET_USERS:
      return {
        ...state,
        [action.type]: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
