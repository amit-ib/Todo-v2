import Button from "../shared/form/Button";
import { TodoModal, CategoryModal } from "../../models";
import { dateConverter } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import {
  deleteTodoAction,
  markDoneTodoAction,
  editTodoAction,
  setTodoAction,
} from "../../store";
import Confirm from "../shared/Confirm";
import Input from "../shared/form/Input";
import moment from "moment";
import { statesModal } from "../../store/todoReducer";
interface Props {
  todoItem: TodoModal;
  id: number;
}

const TodoItem = ({ todoItem }: Props) => {
  const { category } = useSelector((state: statesModal) => state);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  // State to check edit state(if already in edit mode)
  const [editMode, setEditMode] = useState<boolean>(false);

  const [todo, setTodo] = useState<TodoModal>({
    id: todoItem.id,
    title: todoItem.title,
    dueDate: todoItem.dueDate,
    category: todoItem.category,
    status: todoItem.status,
  });

  useEffect(() => {
    if (todoItem) {
      setTodo({
        id: todoItem.id,
        title: todoItem.title,
        dueDate: todoItem.dueDate,
        category: todoItem.category,
        status: todoItem.status,
      });
    }
  }, [todoItem]);

  const deleteTaskHandeler = () => {
    dispatch(deleteTodoAction(todoItem));
    setShowModal(false);
  };

  const doneTaskHandeler = () => {
    let data = {
      title: todo.title,
      status: todo.status === 3 ? 1 : 3,
      description: "something",
      dueDate: new Date(todo.dueDate),
      category: todo.category,
    };
    axiosInstance.put(`/todo/${todoItem.id}`, data).then((res) => {
      axiosInstance
        .get("/todos")
        .then((res) => dispatch(setTodoAction(res.data)));
    });
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
    // dispatch(editTodoAction(todo));
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
            <select
              name=""
              id=""
              onChange={(e) => editFormDataChanger("category", e.target.value)}
            >
              <option value="0" disabled>
                Select Category
              </option>
              {category.map((category, id) => (
                <option
                  value={category.id}
                  selected={category.id === todoItem.category}
                >
                  {category.title}
                </option>
              ))}
            </select>

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
            label={todo.status === 3 ? "Reschedule" : "Mark Done"}
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
