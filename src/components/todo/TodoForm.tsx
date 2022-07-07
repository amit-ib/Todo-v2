import React, { useState } from "react";
import Input from "../shared/form/Input";
import Button from "../shared/form/Button";

const TodoForm = () => {
  const [todotext, setTodoText] = useState<string>("");
  const handelInputChange = (e: React.ChangeEvent<any>) => {
    setTodoText(e.target.value);
  };
  return (
    <form className="todo-form">
      <Input
        value={todotext}
        onChange={handelInputChange}
        placeholder="Please enter task"
      />
      <Button />
    </form>
  );
};

export default TodoForm;
