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
const todoReducer = (
  state: todoList = initialState,
  action: { type: string; payload: TodoModal }
) => {
  switch (action.type) {
    case "DELETE_TODO":
      //console.log("ACTION", state);
      let remainingTasks = state.tasks.filter(
        (todoItem) => todoItem.id !== action.payload.id
      );
      return {
        ...state, // copy origenal state and update only required
        tasks: remainingTasks,
      };
    case "DONE_TODO":
      let DoneTasks = [...state.tasks];
      DoneTasks.forEach((item) => {
        if (item.id === action.payload.id) {
          item.isDone = !item.isDone;
        }
      });
      return {
        ...state,
        tasks: DoneTasks,
      };

    case "ADD_TODO":
      let ADDTasks = [...state.tasks];

      ADDTasks.push(action.payload);
      return {
        ...state,
        tasks: ADDTasks,
      };

    // case "EDIT_TODO":
    //   let EditTasks = [...state.tasks];
    //   return {
    //     ...state,
    //     tasks: EditTasks,
    //   };
    default:
      return state;
  }
};

export default todoReducer;
