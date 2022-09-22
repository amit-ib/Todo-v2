import React, { useState } from "react";
import Input from "../shared/form/Input";
import Button from "../shared/form/Button";
import { useDispatch } from "react-redux";
import { addTodoAction } from "../../store";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { filters } from "../../mock-data/filters";

const TodoForm = ({
  setFilter,
  filter,
}: {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
}) => {
  const dispatch = useDispatch();
  const [todotext, setTodoText] = useState<string>("");
  // Handeling filter active state
  //const [activeId, setActiveId] = useState(Number);

  const addTodoInputHandeler = (e: any) => {
    setTodoText(e.target.value);
  };

  const handleFilters = (id: number, filter: string) => {
    if (setFilter) {
      setFilter(filter);
    }
    //setActiveId(id);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todotext) {
      dispatch(
        addTodoAction({
          id: uuid(),
          todo: todotext,
          date: moment().toDate(),
          isDone: false,
        })
      );
    }
  };
  return (
    <>
      <form className="todo-form" onSubmit={handleAdd}>
        <Input
          value={todotext}
          onChange={addTodoInputHandeler}
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
              filter === fiterItem.filter ? fiterItem.defaultActive : ""
            }  ${filter === fiterItem.filter ? "active" : ""}`}
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
