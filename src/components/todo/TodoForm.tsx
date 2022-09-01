import React, { useState } from "react";
import Input from "../shared/form/Input";
import Button from "../shared/form/Button";
import { Props } from "./TodoList";
import moment from "moment";

const TodoForm = ({ todos, setTodos, setFilter }: Props) => {
  const [todotext, setTodoText] = useState<string>("");
  const [isActive, setIsActive] = useState(false);

  const changeStyle = () => {
    setIsActive((current) => !current);
  };

  const handelInputChange = (e: any) => {
    setTodoText(e.target.value);
  };
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todotext) {
      const updatedTodos = [...todos];
      const todo = {
        id: todos.length + 1,
        todo: todotext,
        date: moment().toDate(),
        isDone: false,
      };
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
        <Button className="button-plus" label="+" />
      </form>
      <div className="filters">
        <span
          className="active filter-type"
          onClick={() => {
            if (setFilter) {
              setFilter("all");
              changeStyle();
            }
          }}
        >
          All
        </span>
        <span
          className={`filter-type ${isActive ? "active" : ""}`}
          onClick={() => {
            if (setFilter) {
              setFilter("pending");
              changeStyle();
            }
          }}
        >
          Pending
        </span>
        <span
          className={`filter-type ${isActive ? "active" : ""}`}
          onClick={() => {
            if (setFilter) {
              setFilter("done");
              changeStyle();
            }
          }}
        >
          Completed
        </span>
      </div>
    </>
  );
};

export default TodoForm;
