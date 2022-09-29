import { useState } from "react";
import Button from "../shared/form/Button";
import { useDispatch } from "react-redux";
import { setTodoAction } from "../../store";
import axiosInstance from "../../axiosConfig";
import { useForm, SubmitHandler } from "react-hook-form";
import moment from "moment";

interface addTodoDataType {
  title: string;
  dueDate: Date;
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
    console.log(data);

    let addData = {
      title: data.title,
      status: 1,
      dueDate: data.dueDate,
      category: 1,
    };
    axiosInstance.post("/todo", addData).then(() => {
      axiosInstance.get("/todos").then((res) => {
        reset();
        dispatch(setTodoAction(res.data));
      });
    });
  };

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit(handleAdd)}>
        <input
          {...register("title", { required: true })}
          placeholder="Please enter todo"
        />
        <span className="error">
          {errors.title?.type === "required" && "Please enter todo"}
        </span>
        <div className="input-date-container">
          <input
            {...register("dueDate", { required: true, valueAsDate: true })}
            defaultValue={moment(new Date()).format("YYYY-MM-DD")}
            placeholder="Please enter date of todo"
            className="input-date"
            type="date"
          />
          <span className="error">
            {errors.dueDate?.type === "required" && "Please enter a date"}
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
