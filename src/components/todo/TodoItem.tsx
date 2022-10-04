import Button from "../shared/form/Button";
import { TodoModal } from "../../models";
import { dateConverter } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  deleteTodoAction,
  markDoneTodoAction,
  setTodoAction,
} from "../../store";
import Confirm from "../shared/Confirm";
import moment from "moment";
import axiosInstance from "../../axiosConfig";
import { useForm, SubmitHandler } from "react-hook-form";
import { statesModal } from "../../store/todoReducer";
import { ToDoStatus } from "../../models/status.model";
import { tostType } from "../../App";

interface Props {
  todoItem: TodoModal;
  id: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTost: React.Dispatch<React.SetStateAction<tostType>>;
}
interface updateTodoDataType {
  title: string;
  dueDate: string;
  category: number;
  status: number;
}

const TodoItem = ({ todoItem, setLoading, setTost }: Props) => {
  const { categories, status } = useSelector((state: statesModal) => state);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  // State to check edit state(if already in edit mode)
  const [editMode, setEditMode] = useState<boolean>(false);
  var todoData = {
    id: todoItem.id,
    title: todoItem.title,
    dueDate: todoItem.dueDate,
    category: todoItem.category,
    status: todoItem.status,
  };
  useEffect(() => {
    if (todoItem) {
      setTodo(todoData);
    }
  }, [todoItem]);

  const [todo, setTodo] = useState(todoData);
  const deleteTaskHandeler = async () => {
    setShowModal(false);
    setLoading(true);
    await axiosInstance.delete(`/todo/${todoItem.id}`).then(async () => {
      await axiosInstance
        .get("/todos")
        .then((res) => dispatch(setTodoAction(res.data)));
      setLoading(false);
      setTost({
        tostState: true,
        tostMessage: "Task Deleted Successfully",
        tostType: "success",
      });
    });
  };

  const doneTaskHandeler = async () => {
    //dispatch(markDoneTodoAction(todoItem));
    let data = {
      id: todoItem.id,
      title: todo.title,
      status:
        todo.status === ToDoStatus.COMPLETED
          ? ToDoStatus.PENDING
          : ToDoStatus.COMPLETED,
      dueDate: new Date(todo.dueDate),
      category: todo.category,
    };
    setLoading(true);
    await axiosInstance.put(`/todo/${todoItem.id}`, data).then(async (res) => {
      await axiosInstance
        .get("/todos")
        .then((res) => dispatch(setTodoAction(res.data)));
    });
    setLoading(false);
  };

  const editTaskHandeler = () => {
    setEditMode(true);
  };

  const editFormDataChanger = (type: string, data: string | Date) => {
    const updatedTodo = { ...todo, [type]: data };
    setTodo(updatedTodo);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<updateTodoDataType>({
    defaultValues: {
      title: todoItem.title,
      dueDate: moment(todoItem.dueDate).format("YYYY-MM-DD"),
    },
  });

  const updateTaskHandeler: SubmitHandler<updateTodoDataType> = async (
    data
  ) => {
    let updateData = {
      title: data.title,
      status: data.status,
      dueDate: data.dueDate,
      category: data.category,
    };
    setLoading(true);

    await axiosInstance
      .put(`/todo/${todoItem.id}`, updateData)
      .then(async (res) => {
        await axiosInstance
          .get("/todos")
          .then((res) => dispatch(setTodoAction(res.data)));
      });
    setLoading(false);
    setEditMode(false);
    setTost({
      tostState: true,
      tostMessage: "Task Edited Successfully",
      tostType: "success",
    });
  };

  return (
    <div className="list-item">
      {editMode ? (
        //If in edit mode then display Textbox
        <div className="edit-task-container">
          <form onSubmit={handleSubmit(updateTaskHandeler)}>
            <input {...register("title", { required: true })} />
            <span className="error">
              {errors.title?.type === "required" && "Please enter todo"}
            </span>
            <input
              {...register("dueDate", { required: true })}
              type="date"
              onChange={(e) =>
                editFormDataChanger("dueDate", new Date(e.target.value))
              }
            />
            <div className="input-set">
              <div className="input-col">
                <label>Category</label>
                <select
                  {...register("category")}
                  defaultValue={todoItem.category}
                >
                  {categories.map((category, id) => (
                    <option
                      key={category.id}
                      defaultValue={
                        category.id === todoItem.category ? category.id : 0
                      }
                      value={category.id}
                    >
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-col">
                <label>Status</label>
                <select {...register("status")} defaultValue={todoItem.status}>
                  {status.map((status, id) => (
                    <option
                      key={status.id}
                      defaultValue={
                        status.id === todoItem.status ? status.id : 0
                      }
                      value={status.id}
                    >
                      {status.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="button-set">
              <Button type="submit" label="Update" varient="primary" />

              <Button
                type="button"
                label="Cancel"
                varient="secondary"
                onClick={() => {
                  setEditMode(false);
                }}
              />
            </div>
          </form>
        </div>
      ) : (
        <div
          className={`list-item-text 
          ${todoItem.status === ToDoStatus.COMPLETED ? "task-done" : ""}
        `}
        >
          {todoItem.title}

          <div className="date">{dateConverter(todoItem.dueDate)}</div>
        </div>
      )}

      {!editMode && (
        <div className="action-icons">
          <Button
            label="Mark Done"
            className="link"
            onClick={doneTaskHandeler}
          />
          <Button
            label="Edit"
            className="link red"
            disabled={todoItem.status === ToDoStatus.COMPLETED ? true : false}
            onClick={editTaskHandeler}
          />
          <Button
            label="Delete"
            className="link blue"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => {
              setShowModal(true);
            }}
          />
        </div>
      )}

      <Confirm
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        text="Are you sure you want to delete this task?"
        title="Delete Task Confirmation"
        buttonLabel="Delete"
        buttonAction={deleteTaskHandeler}
      />
    </div>
  );
};

export default TodoItem;
