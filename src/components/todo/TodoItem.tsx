import Button from "../shared/form/Button";
import { TodoModal } from "../../models";
import { dateConverter } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  deleteTodoAction,
  markDoneTodoAction,
  setTodoAction,
} from "../../store";
import Confirm from "../shared/Confirm";
import Input from "../shared/form/Input";
import moment from "moment";
import axiosInstance from "../../axiosConfig";
interface Props {
  todoItem: TodoModal;
  id: number;
}

const TodoItem = ({ todoItem }: Props) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  // State to check edit state(if already in edit mode)
  const [editMode, setEditMode] = useState<boolean>(false);

  const [todo, setTodo] = useState({
    id: todoItem.id,
    title: todoItem.title,
    dueDate: todoItem.dueDate,
    category: todoItem.category,
    status: todoItem.status,
  });

  const deleteTaskHandeler = () => {
    dispatch(deleteTodoAction(todoItem));
    setShowModal(false);
  };

  const doneTaskHandeler = () => {
    dispatch(markDoneTodoAction(todoItem));
  };

  const editTaskHandeler = () => {
    setEditMode(true);
  };

  const editFormDataChanger = (type: string, data: string | Date) => {
    const updatedTodo = { ...todo, [type]: data };
    setTodo(updatedTodo);
  };

  const updateTaskHandeler = () => {
    let data = {
      title: todo.title,
      status: todo.status,
      description: "something",
      dueDate: new Date(todo.dueDate),
      category: todo.category,
    };
    axiosInstance.put(`/todo/${todoItem.id}`, data).then((res) => {
      axiosInstance
        .get("/todos")
        .then((res) => dispatch(setTodoAction(res.data)));
    });
    setEditMode(false);
  };

  return (
    <div className="list-item">
      {editMode ? (
        //If in edit mode then display Textbox
        <div className="edit-task-container">
          <form>
            <Input
              type="text"
              placeholder=""
              value={todo.title}
              onChange={(e) => editFormDataChanger("title", e.target.value)}
            />
            <Input
              type="date"
              value={moment(todo.dueDate).format("YYYY-MM-DD")}
              onChange={(e) =>
                editFormDataChanger("dueDate", new Date(e.target.value))
              }
            />

            <div className="button-set">
              <Button
                type="submit"
                label="Update"
                varient="primary"
                onClick={updateTaskHandeler}
              />

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
          ${todoItem.status === 3 ? "task-done" : ""}
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
            disabled={todoItem.status === 3 ? true : false}
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
