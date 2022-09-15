import React, { useState } from "react";
import Input from "../shared/form/Input";
import Button from "../shared/form/Button";
import { Props } from "./TodoList";
import moment from "moment";
import { filters } from "../../mock-data/filters";

const TodoForm = ({ todos, setFilter }: Props) => {
  const [todotext, setTodoText] = useState<string>("");

  // Handeling filter active state
  const [activeId, setActiveId] = useState(Number);

  // Function to handel filter functionality
  const handleFilters = (id: number, filter: string) => {
    if (setFilter) {
      setFilter(filter);
    }
    setActiveId(id);
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
      //setTodos(updatedTodos);
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
          className="input-task"
        />
        <Button className="button plus" label="+" />
      </form>
      <div className="filters">
        {filters.map((fiterItem) => (
          <span
            key={fiterItem.id}
            className={`filter-type ${
              activeId === 0 ? fiterItem.defaultActive : ""
            }  ${activeId === fiterItem.id ? "active" : ""}`}
            onClick={() => {
              handleFilters(fiterItem.id, fiterItem.filter);
            }}
          >
            {fiterItem.text}
          </span>
        ))}
      </div>
    </>
  );
};

export default TodoForm;
