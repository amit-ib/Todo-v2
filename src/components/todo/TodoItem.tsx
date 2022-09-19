import Button from "../shared/form/Button";
import { TodoModal } from "../../models";
import { dateConverter } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { useState } from "react"
import Modal from "react-bootstrap/Modal";
import { deleteTodo } from "../../redux";
import Confirm from "../shared/Confirm";
interface Props {
  todoItem: TodoModal;
  id: number;
}

const TodoItem = ({ todoItem }: Props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatchDelete = () =>
  {
    dispatch(deleteTodo(todoItem));
    handleClose();
  }

  return (
    <div className="list-item">
      <div
        className={`list-item-text 
            ${todoItem.isDone ? "task-done" : ""}
          `}
      >
        {todoItem.todo}

        <div className="date">{dateConverter(todoItem.date)}</div>
      </div>

      <div className="action-icons">
        <Button label="Mark Done" className="link" />
        <Button label="Edit" className="link red" />
        <Button
          label="Delete"
          className="link blue"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={handleShow}
        />
      </div>
      <Confirm show={show} onHide={handleClose} text="Are you sure you want to delete this task?" title="Delete Task Confirmation" buttonLabel="Delete" buttonAction={dispatchDelete} />
    </div>
  );
};

export default TodoItem;
