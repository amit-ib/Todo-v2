import React, { useState } from "react";
import Input from "../shared/form/Input";
import Button from "../shared/form/Button";

const TodoForm = () => {
  const [todotext, setTodoText] = useState<string>("");
  return (
    <form className="todo-form">
      <Input
        type="text"
        value={todotext}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Please enter task"
      />
      <Button />
    </form>
  );
};

export default TodoForm;
