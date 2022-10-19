import Button from "../shared/form/Button";
import { useDispatch } from "react-redux";
import { setTodoAction } from "../../store";
import { StatusModal } from "../../models/status.model";
import axiosInstance from "../../axiosConfig";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { TodoModal, CategoryModal } from "../../models";
import { TostType } from "../../models/toasts.model";
import Select from "../shared/form/Select";
import Input from "../shared/form/Input";
import { dateConverter } from "../../utils/helper";
import moment from "moment";

export interface addTodoDataType {
  title: string;
  dueDate: string;
  category: number;
  status: string;
}

interface Props {
  todos: TodoModal[];
  status: StatusModal[];
  activeId: Number;
  categories: CategoryModal[];
  editTask: TodoModal | null;
  setTost: React.Dispatch<React.SetStateAction<TostType>>;
  setActiveId: React.Dispatch<React.SetStateAction<Number>>;
  setFilter: React.Dispatch<React.SetStateAction<TodoModal[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoForm = ({
  todos,
  status,
  activeId,
  setActiveId,
  setFilter,
  setLoading,
  setTost,
  categories,
  editTask,
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

  const [isActive, setActive] = useState(false);
  const [buttonDisabled, setbuttonDisabled] = useState(false);

  const handleAdd: SubmitHandler<addTodoDataType> = async (data) => {
    let addData = {
      title: data.title,
      status: 1,
      dueDate: data.dueDate ? data.dueDate : moment(),
      category: 1,
    };

    setbuttonDisabled(true);
    await axiosInstance.post("/todo", addData);
    await axiosInstance.get("/todos").then((res) => {
      reset();
      dispatch(setTodoAction(res.data));
    });
    setbuttonDisabled(false);
  };

  const updateTaskHandeler: SubmitHandler<addTodoDataType> = async (data) => {
    if (editTask) {
      let updateData = {
        title: data.title,
        status: data.status,
        dueDate: data.dueDate,
        category: data.category,
      };
      setbuttonDisabled(true);

      await axiosInstance
        .put(`/todo/${editTask.id}`, updateData)
        .then(async (res) => {
          await axiosInstance
            .get("/todos")
            .then((res) => dispatch(setTodoAction(res.data)));
        });
      setbuttonDisabled(false);
      setTost({
        tostState: true,
        tostMessage: "Task Edited Successfully",
        tostType: "success",
      });
      reset();
    }
  };

  // Handeling filter active state
  const handleFilters = (status: StatusModal) => {
    setActiveId(status.id);
    if (setFilter) {
      setFilter(todos.filter((todoItem) => todoItem.status === status.id));
    }
  };

  useEffect(() => {
    if (editTask) {
      setValue("title", editTask.title);
      setValue("dueDate", dateConverter(editTask.dueDate));
      setValue("category", editTask.category);
    }
  }, [editTask]);

  const toggleClass = () => {
    setActive(!isActive);
  };
  return (
    <>
      <form
        className="todo-form"
        onSubmit={handleSubmit(editTask ? updateTaskHandeler : handleAdd)}
      >
        <div className="task-input-group">
          <div className="task-input">
            <Input
              type="text"
              register={register}
              name={"title"}
              placeholder={"Please enter todo"}
              isRequired={true}
              errorMessage="Please enter todo"
              errors={errors.title?.message}
            />
          </div>
          <Input
            type="date"
            register={register}
            name={"dueDate"}
            isRequired={false}
            className={"input-date"}
          />
          <Button
            type="submit"
            className="button plus"
            label="+"
            disabled={buttonDisabled}
          />
        </div>

        <div
          className={`input-category-group collapsible-content ${
            isActive ? "active" : ""
          }`}
        >
          <div className="input-set me-2">
            <label htmlFor="">Category</label>
            <Select
              register={register}
              name={"category"}
              optvalues={categories}
              selectedOption={editTask?.category}
            />
          </div>
          <div className="input-set">
            <label htmlFor="">Status</label>
            <Select
              register={register}
              name={"status"}
              optvalues={status}
              selectedOption={editTask?.status}
            />
          </div>
        </div>
        <div className={`toggle-arrow ${isActive ? "active" : ""}`}>
          <label
            htmlFor="collapsible3"
            className="lbl-toggle"
            onClick={toggleClass}
          >
            {isActive ? "Hide options" : "More options"}
          </label>
        </div>
      </form>
      <div className="filters">
        {statusList.map((status, id) => (
          <span
            key={status.id}
            className={`filter-type ${activeId === status.id ? "active" : ""}`}
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
