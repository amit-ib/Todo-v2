import Button from "../shared/form/Button";
import { useDispatch } from "react-redux";
import { filterTodoAction, setTodoAction } from "../../store";
import { StatusModal } from "../../models/status.model";
import axiosInstance from "../../axiosConfig";
import { useForm, SubmitHandler } from "react-hook-form";
import moment from "moment";
import { TodoModal } from "../../models";

interface addTodoDataType {
  title: string;
  dueDate: Date;
}

interface Props {
  todos: TodoModal[];
  status: StatusModal[];
  activeId: Number;
  setActiveId: React.Dispatch<React.SetStateAction<Number>>;
}

const TodoForm = ({ todos, status, activeId, setActiveId }: Props) => {
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
    formState: { errors },
  } = useForm<addTodoDataType>({});

  const handleAdd: SubmitHandler<addTodoDataType> = (data) => {
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

  // Handeling filter active state
  const handleFilters = (status: StatusModal) => {
    setActiveId(status.id);

    dispatch(
      filterTodoAction(
        todos.filter((todoItem) => todoItem.status === status.id)
      )
    );
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
