import { TodoModal } from "../models";
import { staticTodo } from "../mock-data/todo";
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
    default:
      return state;
  }
};

export default todoReducer;
