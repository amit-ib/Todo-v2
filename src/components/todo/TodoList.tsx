import React from "react";
import { TodoModal } from "../../models";
import SingleTodo from "./TodoTaskItem";

export interface Props {
  todos: TodoModal[];
  setTodos: React.Dispatch<React.SetStateAction<TodoModal[]>>; // copied from setTodos state
}

const TodoList = ({ todos }: Props) => {
  return (
    <div>
      {todos.map((allTodo) => (
        <SingleTodo todoSingleObj={allTodo} />
      ))}
    </div>
  );
};

export default TodoList;
