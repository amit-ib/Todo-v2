import { useState } from "react";
import { TodoModal } from "../../models";
import Button from "../shared/form/Button";
import { dateConverter } from "../../utils/helper";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../redux";

interface Props {
  todoItem: TodoModal;
  id: number;
}

const TodoItem = ({ todoItem }: Props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button
            label="Close"
            className="btn btn-secondary"
            onClick={() => {
              handleClose();
            }}
          />
          <Button
            label="Delete"
            className="btn btn-primary"
            onClick={() => {
              dispatch(deleteTodo(todoItem));
              handleClose();
            }}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TodoItem;
