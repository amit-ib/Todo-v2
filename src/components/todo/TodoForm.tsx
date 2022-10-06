import Button from "../shared/form/Button";
import { useDispatch } from "react-redux";
import { editTodoAction, filterTodoAction, setTodoAction } from "../../store";
import axiosInstance from "../../axiosConfig";
import { useForm, SubmitHandler } from "react-hook-form";
import moment from "moment";
import { tostType } from "../../App";
import { StatusModal } from "../../models/status.model";
import { useEffect, useState } from "react";
import { TodoModal, CategoryModal } from "../../models";

interface addTodoDataType {
  title: string;
  dueDate: string;
  category: number;
}
interface Props {
  todos: TodoModal[];
  categories: CategoryModal[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTost: React.Dispatch<React.SetStateAction<tostType>>;
  status: StatusModal[];
  activeId: Number;
  editTask: TodoModal | null;
  setActiveId: React.Dispatch<React.SetStateAction<Number>>;
}

const TodoForm = ({
  todos,
  setLoading,
  setTost,
  categories,
  status,
  activeId,
  editTask,
  setActiveId,
}: Props) => {
  const dispatch = useDispatch();

  const statusList = [
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
    setValue,
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

    dispatch(
      filterTodoAction(
        todos.filter((todoItem) => todoItem.status === status.id)
      )
    );
  };

  const updateTaskHandeler: SubmitHandler<addTodoDataType> = async (data) => {
    if (editTask) {
      let updateData = {
        title: data.title,
        status: editTask.status,
        dueDate: data.dueDate,
        category: data.category,
      };
      setLoading(true);

      await axiosInstance
        .put(`/todo/${editTask.id}`, updateData)
        .then(async (res) => {
          dispatch(editTodoAction(null));
          reset();
          await axiosInstance
            .get("/todos")
            .then((res) => dispatch(setTodoAction(res.data)));
        });
      setLoading(false);
      //setEditMode(false);
      setTost({
        tostState: true,
        tostMessage: "Task Edited Successfully",
        tostType: "success",
      });
    }
  };

  useEffect(() => {
    //console.log(editTask);
    if (editTask) {
      //console.log(new Date(editTask.dueDate));
      // reset({
      //   title: editTask.title,
      //   dueDate: new Date(editTask.dueDate),
      // });
      setValue("title", editTask.title);
      setValue("dueDate", moment(editTask.dueDate).format("YYYY-MM-DD"));
      setValue("category", editTask.category);
    }
  }, [editTask]);

  return (
    <>
      {/* <form className="todo-form" onSubmit={handleSubmit(handleAdd)}> */}
      <form
        className="todo-form"
        onSubmit={handleSubmit(editTask ? updateTaskHandeler : handleAdd)}
      >
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
          <select {...register("category")}>
            {categories.map((category, id) => (
              <option
                key={category.id}
                defaultValue={
                  category.id === editTask?.category ? category.id : 0
                }
                value={category.id}
              >
                {category.title}
              </option>
            ))}
          </select>
          <Button type="submit" className="button plus" label="+" />
        </div>
      </form>
      <div className="filters">
        {/* <span className="active filter-type">All</span>
        <span className="filter-type">Pending</span>
        <span className="filter-type">Completed</span> */}
        {statusList.map((status, id) => (
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
