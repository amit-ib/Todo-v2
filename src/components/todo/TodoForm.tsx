import React, { useState } from "react";
import Input from "../shared/form/Input";
import Button from "../shared/form/Button";

const TodoForm = () => {
  const [todotext, setTodoText] = useState<string>("");

  const handelInputChange = (e: any) => {
    setTodoText(e.target.value);
  };
  return (
    <>
    <form className="todo-form">
    <Input
          value={todotext}
          onChange={handelInputChange}
          placeholder="Please enter task"
          className="input-task"
        />
        <Button className="button plus" label="+" />
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
