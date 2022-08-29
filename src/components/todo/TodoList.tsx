import React from "react";
import { TodoModal } from "../../models";
import TodoItem from "./TodoItem";

export interface Props {
  todos: TodoModal[];
  setTodos: React.Dispatch<React.SetStateAction<TodoModal[]>>; // copied from setTodos state
}

const TodoList = ({ todos, setTodos }: Props) => {
  return (
    <>
      {todos.map((allTodo, index) => (
        <TodoItem todoItems={todos} setTodos={setTodos} index={index} />
      ))}
    </>
  );
};

export default TodoList;
