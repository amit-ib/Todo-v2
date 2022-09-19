import Button from "../shared/form/Button";
import Input from "../shared/form/Input";
import { TodoModal } from "../../models";
import { dateConverter } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { useState } from "react"
import Modal from "react-bootstrap/Modal";
import { deleteTodo, markDoneTodo,editTodo } from "../../redux";
import moment from "moment";
interface Props {
  todoItem: TodoModal;
  id: number;
}

const TodoItem = ({ todoItem }: Props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // State to check edit state(if already in edit mode)
  const [editMode, setEditMode] = useState<boolean>(false);

  const [input, setInput] = useState(todoItem.todo);
  const [date, setDate] = useState(todoItem.date);
  
  // Enabeling edit mode
  const enableEditing = (id: number) => {
    if (!todoItem.isDone) {
      setEditMode(true);
    }
  };

  return (
    <div className="list-item">
      {/* <div
        className={`list-item-text 
            ${todoItem.isDone ? "task-done" : ""}
          `}
      >
        {todoItem.todo}

        <div className="date">{dateConverter(todoItem.date)}</div>
      </div> */}

{editMode ? (
        //If in edit mode then display Textbox
        <div className="edit-task-container">
          <form > 
            {/* onSubmit={handleSubmit(onSubmit)}
            <input {...register("task", { required: true })} />
            {errors.task?.type === "required" && "Please enter task"}
            <input {...register("date", { required: true })} type="date" /> */}
            <Input type="text" placeholder="" value={input} onChange={e => setInput(e.target.value)} />
            <Input type="date" value={moment(date).format('YYYY-MM-DD')} onChange={e => setDate(new Date(e.target.value))} />
            <Button type="submit" label="Update" className="button primary" onClick={() => {
              dispatch(editTodo({
                id: todoItem.id,
                todo: input,
                date: new Date(date),
                isDone: todoItem.isDone,
              }));
              setEditMode(false);
            }} />
            <Button type="button" label="Cancle" className="button secondary"  onClick={() => {
              setEditMode(false)
            }}   />
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
      <div className="action-icons">
        <Button label="Mark Done" className="link" onClick={() => {
              dispatch(markDoneTodo(todoItem));
            }} />
        <Button label="Edit" disabled={todoItem.isDone} className="link red" onClick={() => {
              setEditMode(true)
            }}   />
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
