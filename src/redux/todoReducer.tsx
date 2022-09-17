import { TodoModal } from "../models";
import { staticTodo } from "../mock-data/todo";
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
        const todo = {
          id: state.tasks.length + 1,
          todo: action.payload,
          date: moment().toDate(),
          isDone: false,
        };
        updatedTodos.push(todo);
      }
     
      return {
        ...state, // copy origenal state and update only required
       tasks:updatedTodos
      };
    default:
      return state;
  }
};

export default todoReducer;