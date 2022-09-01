import { TodoModal } from "../models";

export const staticTodo: TodoModal[] = [
  {
    id: 1,
    todo: "First Todo",
    date: new Date(),
    isDone: true,
  },
  {
    id: 2,
    todo: "Second Todo",
    date: new Date(),
    isDone: false,
  },
  {
    id: 3,
    todo: "Third Todo",
    date: new Date(),
    isDone: false,
  },
];
