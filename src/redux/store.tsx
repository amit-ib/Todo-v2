import { createStore } from "redux";
import todoReducer from "./todoReducer";

const store = createStore(todoReducer); // accepts reducer function as param

export default store;