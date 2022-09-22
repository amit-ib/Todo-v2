import Button from "../shared/form/Button";
import { TodoModal } from "../../models";
import { dateConverter } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  deleteTodoAction,
  markDoneTodoAction,
  editTodoAction,
} from "../../store";
import Confirm from "../shared/Confirm";
import Input from "../shared/form/Input";
import moment from "moment";
interface Props {
  todoItem: TodoModal;
  id: string;
}

const TodoItem = ({ todoItem }: Props) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  // State to check edit state(if already in edit mode)
  const [editMode, setEditMode] = useState<boolean>(false);

  const [todo, setTodo] = useState({
    id: todoItem.id,
    todo: todoItem.todo,
    date: todoItem.date,
    isDone: todoItem.isDone,
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
    dispatch(editTodoAction(todo));
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
              value={todo.todo}
              onChange={(e) => editFormDataChanger("todo", e.target.value)}
            />
            <Input
              type="date"
              value={moment(todo.date).format("YYYY-MM-DD")}
              onChange={(e) =>
                editFormDataChanger("date", new Date(e.target.value))
              }
            />

            <div className="button-set">
              <Button
                type="submit"
                label="Update"
                className="button primary"
                onClick={updateTaskHandeler}
              />

              <Button
                type="button"
                label="Cancel"
                className="button secondary"
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
            ${todoItem.isDone ? "task-done" : ""}
          `}
        >
          {todoItem.todo}

          <div className="date">{dateConverter(todoItem.date)}</div>
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
            disabled={todoItem.isDone}
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
