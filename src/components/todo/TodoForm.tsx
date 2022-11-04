import Button from "../shared/form/Button";
import { useDispatch, useSelector } from "react-redux";
import { setStatusCountAction, setTodoAction } from "../../store";
import axiosInstance from "../../axiosConfig";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { TodoModal, StatusCountModal } from "../../models";
import { TostType } from "../../models/toasts.model";
import Select from "../shared/form/Select";
import Input from "../shared/form/Input";
import { dateConverterYMD, loggedInUserData } from "../../utils/helper";
import { featchToDos, updateToDos } from "../../services/axiosService";
import { statesModal } from "../../store/todoReducer";

export interface addTodoDataType {
  title: string;
  dueDate: string;
  category: number;
  status: number;
  priority: number;
  assignee: number[];
}

interface Props {
  todos: TodoModal[];
  statusCount: StatusCountModal | null;
  activeId: number;
  editTask: TodoModal | null;
  setTost: React.Dispatch<React.SetStateAction<TostType>>;
  setActiveId: React.Dispatch<React.SetStateAction<number>>;
  setFilter: React.Dispatch<React.SetStateAction<TodoModal[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoForm = ({
  todos,
  statusCount,
  activeId,
  setActiveId,
  setFilter,
  setLoading,
  setTost,
  editTask,
}: Props) => {
  const dispatch = useDispatch();
  const { todoConfig, users } = useSelector((state: statesModal) => state);
  const statusList = [
    {
      id: 0,
      title: "All",
    },
    ...todoConfig.status,
  ];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<addTodoDataType>({
    defaultValues: {
      priority: 4,
      category: 1,
      status: 1,
      dueDate: dateConverterYMD(new Date()),
      assignee: [loggedInUserData().id],
    },
  });

  const [isActive, setActive] = useState(false);
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const handleAdd: SubmitHandler<addTodoDataType> = async (data) => {
    setbuttonDisabled(true);
    await axiosInstance.post("/todo", data);
    await featchToDos().then((res) => {
      dispatch(setTodoAction(res.data.todos));
      delete res.data.todos;
      dispatch(setStatusCountAction(res.data));
    });
    reset();
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
      await updateToDos(editTask.id, updateData);
      await featchToDos().then((res) => {
        dispatch(setTodoAction(res.data.todos));
        delete res.data.todos;
        dispatch(setStatusCountAction(res.data));
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
  const handleFilters = (statusId: number) => {
    if (setFilter) {
      setFilter(todos.filter((todoItem) => todoItem.status === statusId));
    }
  };

  useEffect(() => {
    if (editTask) {
      setValue("title", editTask.title);
      setValue("dueDate", dateConverterYMD(editTask.dueDate));
      setValue("category", editTask.category);
      setValue("status", editTask.status);
    }
  }, [editTask]);

  useEffect(() => {
    handleFilters(activeId);
  }, [todos]);

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
          <div className="input-set">
            <label htmlFor="">Category</label>
            <Select
              register={register}
              name={"category"}
              optvalues={todoConfig.category}
              selectedOption={editTask?.category}
            />
          </div>
          <div className="input-set mx-2">
            <label htmlFor="">Status</label>
            <Select
              register={register}
              name={"status"}
              optvalues={todoConfig.status}
              selectedOption={editTask?.status}
            />
          </div>
          <div className="input-set">
            <label htmlFor="">Assign to</label>
            <Select
              register={register}
              name={"assignee"}
              optvalues={users}
              selectedOption={editTask?.createdBy}
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
        {statusList.map((status, id) => {
          let statusCounter;
          if (status.title === "All") {
            statusCounter = statusCount?.total;
          } else if (status.title === "Pending") {
            statusCounter = statusCount?.pending;
          } else if (status.title === "In Progress") {
            statusCounter = statusCount?.inProgress;
          } else if (status.title === "Completed") {
            statusCounter = statusCount?.completed;
          } else if (status.title === "Archived") {
            statusCounter = statusCount?.archived;
          }

          return (
            <span
              key={status.id}
              className={`filter-type ${
                activeId === status.id ? "active" : ""
              }`}
              onClick={() => {
                setActiveId(status.id);
                handleFilters(status.id);
              }}
            >
              <>
                {status.title} ({statusCounter})
              </>
            </span>
          );
        })}
      </div>
    </>
  );
};

export default TodoForm;
