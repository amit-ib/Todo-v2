import React, { useState } from "react";
import Input from "../shared/form/Input";
import Button from "../shared/form/Button";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux";
import moment from "moment";

const TodoForm = () => {
  const dispatch = useDispatch();
  const [todotext, setTodoText] = useState<string>("");

  const handelInputChange = (e: any) => {
    setTodoText(e.target.value);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todotext) {

      dispatch(addTodo({
          id: Math.random(),
          todo: todotext,
          date: moment().toDate(),
          isDone: false,
        }));
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
        <span className="active filter-type">All</span>
        <span className="filter-type">Pending</span>
        <span className="filter-type">Completed</span>
      </div>
    </>
  );
};

export default TodoForm;
