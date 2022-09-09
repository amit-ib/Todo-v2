import { useState } from "react";
import moment from "moment";
import { TodoModal } from "../../models";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../shared/form/Button";
import { dateConverter } from "../../utils/helper";
import Modal from "react-bootstrap/Modal";

interface Props {
  todoItem: TodoModal;
  handleTaskDelete: (id: number) => void;
  handleTaskDone: (id: number) => void;
  handleEdit: (data: editForm, id: number) => void;
  id: number;
}

interface editForm {
  task: string;
  date: string;
}

const TodoItem = ({
  todoItem,
  id,
  handleTaskDelete,
  handleTaskDone,
  handleEdit,
}: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<editForm>({
    defaultValues: {
      task: todoItem.todo,
      date: moment(moment(todoItem.date)).format("YYYY-MM-DD"),
    },
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit: SubmitHandler<editForm> = (data) => {
    handleEdit(data, id);
    setEditMode(false);
  };

  // State to check edit state(if already in edit mode)
  const [editMode, setEditMode] = useState<boolean>(false);

  // Enabeling edit mode
  const enableEditing = (id: number) => {
    if (!todoItem.isDone) {
      setEditMode(true);
    }
  };
  return (
    <div className="list-item">
      {editMode ? (
        //If in edit mode then display Textbox
        <div className="edit-task-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("task", { required: true })} />
            {errors.task?.type === "required" && "Please enter task"}
            <input {...register("date", { required: true })} type="date" />
            <Button type="submit" label="Update" className="button primary" />
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
        <Button
          label="Mark Done"
          className="link"
          onClick={() => handleTaskDone(todoItem.id)}
        />
        <Button
          label="Edit"
          className="link red"
          onClick={() => enableEditing(todoItem.id)}
        />
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
              handleTaskDelete(todoItem.id);
              handleClose();
            }}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TodoItem;
