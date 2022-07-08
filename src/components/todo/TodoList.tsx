import React from "react";
import { TodoModal } from "../../models";
import SingleTodo from "./TodoTaskItem";

export interface Props {
  todos: TodoModal[];
  setTodos: React.Dispatch<React.SetStateAction<TodoModal[]>>; // copied from setTodos state
}

const TodoList = ({ todos, setTodos }: Props) => {
  return (
    <div>
      {todos.map((allTodo, index) => (
        <SingleTodo todoArrayOfObj={todos} setTodos={setTodos} index={index} />
      ))}
    </div>
  );
};

export default TodoList;
