import React, { useState } from "react";
import Input from "../shared/form/Input";
import Button from "../shared/form/Button";
import { useDispatch } from "react-redux";
import { addTodoAction } from "../../store";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { useForm, SubmitHandler } from "react-hook-form";

interface addTodoDataType {
  todo: string;
  date: Date;
}

const TodoForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<addTodoDataType>({});
  const handleAdd: SubmitHandler<addTodoDataType> = (data) => {
    dispatch(
      addTodoAction({
        id: uuid(),
        todo: data.todo,
        date: moment(data.date).toDate(),
        isDone: false,
      })
    );
    reset();
  };

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit(handleAdd)}>
        <input
          {...register("todo", { required: true })}
          placeholder="Please enter todo"
        />
        <span className="error">
          {errors.todo?.type === "required" && "Please enter todo"}
        </span>
        <div className="input-date-container">
          <input
            {...register("date", { required: true, valueAsDate: true })}
            defaultValue={moment(new Date()).format("YYYY-MM-DD")}
            placeholder="Please enter date of todo"
            className="input-date"
            type="date"
          />
          <span className="error">
            {errors.date?.type === "required" && "Please enter a date"}
          </span>
          <Button type="submit" className="button plus" label="+" />
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
