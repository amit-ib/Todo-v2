import React, { useState } from "react";
import Input from "../shared/form/Input";
import Button from "../shared/form/Button";
import { Props } from "./TodoList";

const TodoForm = ({ todos, setTodos }: Props) => {
  const [todotext, setTodoText] = useState<string>("");

  const handelInputChange = (e: any) => {
    setTodoText(e.target.value);
  };
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todotext) {
      const updatedTodos = [...todos];
      const todo = { id: Date.now(), todo: todotext, isDone: false };
      updatedTodos.push(todo);
      setTodos(updatedTodos);
      setTodoText("");
    }
  };

  return (
    <>
      <form className="todo-form" onSubmit={handleAdd}>
        <Input
          value={todotext}
          onChange={handelInputChange}
          placeholder="Please enter task"
        />
        <Button />
      </form>
      <div className="filters">
        <span className="active filter-type">All</span>
        <span className="filter-type">Pending</span>
        <span className="filter-type">Completed</span>
      </div>
    </>
  );
};

export default TodoForm;
