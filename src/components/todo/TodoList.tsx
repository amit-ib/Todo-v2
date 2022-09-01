import React from "react";
import { TodoModal } from "../../models";
import TodoItem from "./TodoItem";

export interface Props {
  todos: TodoModal[];
  setTodos: React.Dispatch<React.SetStateAction<TodoModal[]>>; // copied from setTodos state
  setFilter?: React.Dispatch<React.SetStateAction<string>>; // copied from setTodos state
  filter?: string;
}

const TodoList = ({ todos, setTodos, filter }: Props) => {
  let filteredList = todos;
  if (filter === "done") {
    filteredList = todos.filter((todoItem) => todoItem.isDone === true);
  } else if (filter === "pending") {
    filteredList = todos.filter((todoItem) => todoItem.isDone === false);
  } else {
    filteredList = todos;
  }
  console.log(filteredList);
  return (
    <>
      {filteredList.map((todoItem, index) => (
        <TodoItem
          todoItem={todoItem}
          todoItems={todos}
          filteredItems={filteredList}
          setTodos={setTodos}
          index={index}
        />
      ))}
    </>
  );
};

export default TodoList;
