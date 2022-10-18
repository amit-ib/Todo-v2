import Button from "../shared/form/Button";
import { TodoModal } from "../../models";
import { dateConverter } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { editTodoAction, markDoneTodoAction, setTodoAction } from "../../store";
import Confirm from "../shared/Confirm";
import axiosInstance from "../../axiosConfig";
import { ToDoStatus } from "../../models/status.model";
import { TostType } from "../../models/toasts.model";

interface Props {
  todoItem: TodoModal;
  id: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTost: React.Dispatch<React.SetStateAction<TostType>>;
}
const TodoItem = ({ todoItem, setLoading, setTost }: Props) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
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
    let ref = document.getElementById(`${todoItem.id}`);
    ref?.classList.add("delete-animate");
    await axiosInstance.delete(`/todo/${todoItem.id}`);
    await axiosInstance
      .get("/todos")
      .then((res) => dispatch(setTodoAction(res.data)));
    ref?.classList.remove("delete-animate");
    setTost({
      tostState: true,
      tostMessage: "Task Deleted Successfully",
      tostType: "success",
    });
  };

  const doneTaskHandeler = async () => {
    let updateData = {
      status:
        todo.status === ToDoStatus.COMPLETED
          ? ToDoStatus.PENDING
          : ToDoStatus.COMPLETED,
    };
    setLoading(true);
    await axiosInstance
      .put(`/todo/${todo.id}`, updateData)
      .then(async (res) => {
        await axiosInstance
          .get("/todos")
          .then((res) => dispatch(setTodoAction(res.data)));
      });
    setLoading(false);
  };

  const editTaskHandeler = async () => {
    setLoading(true);
    await axiosInstance.get(`/todo/${todoItem.id}`).then((res) => {
      dispatch(editTodoAction(res.data));
    });
    setLoading(false);
  };
  return (
    <div className={`list-item`} id={String(todoItem.id)}>
      <div
        className={`list-item-text 
          ${todoItem.status === ToDoStatus.COMPLETED ? "task-done" : ""}
        `}
      >
        <span
          onClick={doneTaskHandeler}
          className={
            todo.status === ToDoStatus.COMPLETED ? "checked" : "unchecked"
          }
        ></span>
        {todoItem.title}
        <div className="date">{dateConverter(todoItem.dueDate)}</div>
      </div>
      <div className="action-icons">
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
