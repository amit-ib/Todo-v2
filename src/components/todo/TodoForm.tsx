import Button from "../shared/form/Button";
import { useDispatch } from "react-redux";
import { setTodoAction } from "../../store";
import { StatusModal } from "../../models/status.model";
import axiosInstance from "../../axiosConfig";
import { useForm, SubmitHandler } from "react-hook-form";
import moment from "moment";
import { useEffect } from "react";
import { TodoModal, CategoryModal } from "../../models";
import { TostType } from "../../models/toasts.model";

interface addTodoDataType {
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
  };

  const updateTaskHandeler: SubmitHandler<addTodoDataType> = async (data) => {
    if (editTask) {
      let updateData = {
        title: data.title,
        status: data.status,
        dueDate: data.dueDate,
        category: data.category,
      };
      setLoading(true);

      await axiosInstance
        .put(`/todo/${editTask.id}`, updateData)
        .then(async (res) => {
          await axiosInstance
            .get("/todos")
            .then((res) => dispatch(setTodoAction(res.data)));
        });
      setLoading(false);
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
      setValue("dueDate", moment(editTask.dueDate).format("YYYY-MM-DD"));
      setValue("category", editTask.category);
    }
  }, [editTask]);

  return (
    <>
      <form
        className="todo-form"
        onSubmit={handleSubmit(editTask ? updateTaskHandeler : handleAdd)}
      >
        <div className="task-input-group">
          <div className="task-input">
            <input
              {...register("title", { required: true })}
              placeholder="Please enter todo"
            />

            <span className="error">
              {errors.title?.type === "required" && "Please enter todo"}
            </span>
          </div>
          <input
            {...register("dueDate", { required: true, valueAsDate: true })}
            defaultValue={moment(new Date()).format("YYYY-MM-DD")}
            placeholder="Please enter date of todo"
            className="input-date"
            type="date"
          />
        </div>
        <div className="input-category-group">
          <div className="input-set">
            <label htmlFor="">Category</label>
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
          </div>
          <div className="input-set">
            <label htmlFor="">Status</label>
            <select {...register("status")} className="ms-1">
              {status.map((status, id) => (
                <option
                  key={status.id}
                  defaultValue={
                    status.id === editTask?.category ? status.id : 0
                  }
                  value={status.id}
                >
                  {status.title}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="button plus" label="+" />
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
