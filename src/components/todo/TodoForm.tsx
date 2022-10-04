import Button from "../shared/form/Button";
import { useDispatch } from "react-redux";
import { setTodoAction } from "../../store";
import axiosInstance from "../../axiosConfig";
import { useForm, SubmitHandler } from "react-hook-form";
import moment from "moment";
import { tostType } from "../../App";
import { StatusModal } from "../../models/status.model";
import { useState } from "react";

interface addTodoDataType {
  title: string;
  dueDate: Date;
}
interface Props {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTost: React.Dispatch<React.SetStateAction<tostType>>;
  status: StatusModal[];
  activeId: Number;
  setActiveId: React.Dispatch<React.SetStateAction<Number>>;
}

const TodoForm = ({
  setLoading,
  setTost,
  status,
  activeId,
  setActiveId,
}: Props) => {
  const dispatch = useDispatch();

  const totalStatus = [
    {
      id: 0,
      title: "All",
    },
    ...status,
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<addTodoDataType>({});

  const handleAdd: SubmitHandler<addTodoDataType> = async (data) => {
    let addData = {
      title: data.title,
      status: 1,
      dueDate: data.dueDate,
      category: 1,
    };
    setLoading(true);
    await axiosInstance.post("/todo", addData);
    await axiosInstance.get("/todos").then((res) => {
      reset();
      dispatch(setTodoAction(res.data));
    });
    setLoading(false);
    setTost({
      tostState: true,
      tostMessage: "Task Added Successfully",
      tostType: "success",
    });
  };
  // Handeling filter active state
  const handleFilters = (status: StatusModal) => {
    setActiveId(status.id);
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
        {/* <span className="active filter-type">All</span>
        <span className="filter-type">Pending</span>
        <span className="filter-type">Completed</span> */}
        {totalStatus.map((status, id) => (
          <span
            key={status.id}
            className={`filter-type ${activeId === 0 ? status.title : ""}  ${
              activeId === status.id ? "active" : ""
            }`}
            onClick={() => {
              handleFilters(status);
            }}
          >
            {status.title}
          </span>
        ))}
      </div>
    </>
  );
};

export default TodoForm;
