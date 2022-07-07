import React, { useState } from "react";
import Input from "../shared/form/Input";
import Button from "../shared/form/Button";
import { Props } from "./TodoList";

const TodoForm = ({ todos, setTodos }: Props) => {
  const [todotext, setTodoText] = useState<string>("");
  // instead of using "e:any" always use "e:React.FormEvent"
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todotext) {
      setTodos([...todos, { id: Date.now(), todo: todotext, isDone: false }]);
      setTodoText("");
    }
  };

  return (
    <form className="todo-form" onSubmit={handleAdd}>
      <Input
        value={todotext}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Please enter task"
      />
      <Button />
    </form>
  );
};

export default TodoForm;
