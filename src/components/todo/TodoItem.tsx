import Button from "../shared/form/Button";
import { TodoModal } from "../../models";
import { dateConverter } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteTodo, markDoneTodo, editTodo } from "../../redux";
import Confirm from "../shared/Confirm";
import Input from "../shared/form/Input";
import moment from "moment";
interface Props {
  todoItem: TodoModal;
  id: number;
}

const TodoItem = ({ todoItem }: Props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  const handleDelete = () => {
    dispatch(deleteTodo(todoItem));
    handleCloseModal();
  };

  const handleDone = () => {
    dispatch(markDoneTodo(todoItem));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  // State to check edit state(if already in edit mode)
  const [editMode, setEditMode] = useState<boolean>(false);

  const [input, setInput] = useState(todoItem.todo);
  const [date, setDate] = useState(todoItem.date);

  return (
    <div className="list-item">
      {editMode ? (
        //If in edit mode then display Textbox
        <div className="edit-task-container">
          <form>
            <Input
              type="text"
              placeholder=""
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Input
              type="date"
              value={moment(date).format("YYYY-MM-DD")}
              onChange={(e) => setDate(new Date(e.target.value))}
            />

            <div className="button-set">
              <Button
                type="submit"
                label="Update"
                className="button primary"
                onClick={() => {
                  dispatch(
                    editTodo({
                      id: todoItem.id,
                      todo: input,
                      date: new Date(date),
                      isDone: todoItem.isDone,
                    })
                  );
                  setEditMode(false);
                }}
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
          <Button label="Mark Done" className="link" onClick={handleDone} />
          <Button
            label="Edit"
            className="link red"
            disabled={todoItem.isDone}
            onClick={handleEdit}
          />
          <Button
            label="Delete"
            className="link blue"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={handleShowModal}
          />
        </div>
      )}

      <Confirm
        show={show}
        onHide={handleCloseModal}
        text="Are you sure you want to delete this task?"
        title="Delete Task Confirmation"
        buttonLabel="Delete"
        buttonAction={handleDelete}
      />
    </div>
  );
};

export default TodoItem;
