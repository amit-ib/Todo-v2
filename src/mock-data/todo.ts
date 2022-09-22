import { TodoModal } from "../models";

export const staticTodo: TodoModal[] = [
  {
    id: "todo-001",
    todo: "First Todo",
    date: new Date(),
    isDone: true,
  },
  {
    id: "todo-002",
    todo: "Second Todo",
    date: new Date(),
    isDone: false,
  },
  {
    id: "todo-003",
    todo: "Third Todo",
    date: new Date(),
    isDone: false,
  },
];
