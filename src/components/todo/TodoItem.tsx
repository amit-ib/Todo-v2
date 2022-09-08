import { useState } from "react";
import moment from "moment";
import { TodoModal } from "../../models";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../shared/form/Button";
import { dateConverter } from "../../utils/helper";
import Modal from "react-bootstrap/Modal";

interface Props {
  //filteredItems: TodoModal[];
  todoItem: TodoModal;
  //setTodos: React.Dispatch<React.SetStateAction<TodoModal[]>>; // is a function - copied from setTodos state
  //index: number;
  handleTaskDelete: (id: number) => void;
  handleTaskDone: (id: number) => void;
  //onSubmit: SubmitHandler;
  handleEdit: (data: editForm, id: number) => void;
  id: number;
}

interface editForm {
  task: string;
  date: string;
}

const TodoItem = ({
  //todoItems,
  todoItem,
  id,
  //onSubmit,
  handleTaskDelete,
  handleTaskDone,
  handleEdit,
}: //setTodos,
//index,
//filteredItems,
Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<editForm>({
    defaultValues: {
      task: todoItem.todo,
      date: moment(moment(todoItem.date)).format("YYYY-MM-DD"),
    },
  });
  console.log("todoItem.todo", todoItem.todo);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // function to handel done icon
  // const handleTaskDone = (id: number) => {
  //   let todos = [...todoItems];

  //   todos.forEach((item) => {
  //     if (item.id === id) {
  //       item.isDone = !item.isDone;
  //     }
  //   });
  //   setTodos(todos);
  // };

  //const taskItem = todoItem;

  const onSubmit: SubmitHandler<editForm> = (data) => {
    handleEdit(data, id);
    setEditMode(false);
  };

  // State to check edit state(if already in edit mode)
  const [editMode, setEditMode] = useState<boolean>(false);

  // function to handel delete task
  // const handleTaskDelete = (id: number) => {
  //   //setTodos(todoItems.filter((todoItem) => todoItem.id !== id));
  // };

  // Enabeling edit mode
  const enableEditing = (id: number) => {
    if (!todoItem.isDone) {
      setEditMode(true);
    }
    //console.log(watch());
  };
  //console.log(todoItem.id);
  return (
    <div className="list-item">
      {editMode ? (
        //If in edit mode then display Textbox
        <div className="edit-task-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            {id} - {todoItem.todo}
            <input value={todoItem.todo} />
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
          className="button"
          onClick={() => handleTaskDone(todoItem.id)}
        />
        <Button
          label="Edit"
          className="button edit"
          onClick={() => enableEditing(todoItem.id)}
        />
        <Button
          label="Delete"
          className="button delete"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={handleShow}
          //onClick={() => handleTaskDelete(todoItem.id)}
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

      {/* <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Task Confirmation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure, you want to delete this task?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  handleTaskDelete(todoItem.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default TodoItem;
