import React, { useState } from "react";
import Input from "../shared/form/Input";
import Button from "../shared/form/Button";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux";
import moment from "moment";

const TodoForm = () => {
  const dispatch = useDispatch();
  const [todotext, setTodoText] = useState<string>("");
  const [date, setToDoDate] = useState<Date>();

  const handelInputChange = (e: any) => {
    setTodoText(e.target.value);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todotext) {
      dispatch(
        addTodo({
          id: Math.random(),
          todo: todotext,
          //date: moment().toDate(),
          //date: new Date(date),
          date: moment(date).toDate(),
          isDone: false,
        })
      );
      setTodoText("");
      setToDoDate(moment().toDate());
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
        <div className="input-date-container">
          <Input
            type="date"
            value={moment(date).format("YYYY-MM-DD")}
            onChange={(e) => setToDoDate(new Date(e.target.value))}
            className="input-date"
          />
          <Button className="button plus" label="+" />
        </div>
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
