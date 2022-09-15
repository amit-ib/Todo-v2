import React, { useState } from "react";
import Input from "../shared/form/Input";
import Button from "../shared/form/Button";
import { Props } from "./TodoList";
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
