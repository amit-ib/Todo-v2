import { useEffect, useState } from "react";
import moment from "moment";
import { TodoModal } from "../../models";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../shared/form/Button";
import { dateConverter } from "../../utils/helper";

interface Props {
  todoItems: TodoModal[];
  filteredItems: TodoModal[];
  todoItem: TodoModal;
  setTodos: React.Dispatch<React.SetStateAction<TodoModal[]>>; // is a function - copied from setTodos state
  index: number;
}

interface editForm {
  task: string;
  date: string;
}

const TodoItem = ({
  todoItems,
  todoItem,
  setTodos,
  index,
  filteredItems,
}: Props) => {
  // const [defaultVal, setDefaultVal] = useState<editForm>({
  //   task: todoItem.todo,
  //   date: moment(new Date(todoItem.date)).format("YYYY-MM-DD"),
  // });
  // useEffect(() => {
  //   if (todoItem) {
  //     setDefaultVal({
  //       task: todoItem.todo,
  //       date: moment(new Date(todoItem.date)).format("YYYY-MM-DD"),
  //       //date: dateConverter(new Date(todoItem.date)),
  //     });
  //   }
  // }, [todoItem]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<editForm>({
    defaultValues: {
      task: todoItem.todo,
      date: moment(moment(todoItem.date)).format("YYYY-MM-DD"),
      //date: dateConverter(new Date(todoItem.date)),
    },
    // defaultValues: defaultVal,
  });

  // function to handel done icon
  const handleTaskDone = (id: number) => {
    let todos = [...todoItems];

    todos.forEach((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
    });
    setTodos(todos);
    // if (todos[index]) {
    //   todos[index].isDone = !todos[index].isDone;
    // }
    //setTodos(todos);
  };

  const taskItem = todoItem;

  const onSubmit: SubmitHandler<editForm> = (data) => {
    let todos = [...todoItems];
    todos.forEach((item) => {
      if (todoItem.id === item.id) {
        item.todo = data.task;
        item.date = moment(data.date).toDate();
      }
    });
    setTodos(todos);
    setEditMode(false);
  };

  // State to check edit state(if already in edit mode)
  const [editMode, setEditMode] = useState<boolean>(false);

  // function to handel delete task
  const handleTaskDelete = (id: number) => {
    //setTodos(todoItems.filter((todoItem) => todoItem.id !== id));
    setTodos(todoItems.filter((todoItem) => todoItem.id !== id));
  };

  // Enabeling edit mode
  const enableEditing = (id: number) => {
    if (!taskItem.isDone) {
      setEditMode(true);
    }
    console.log(watch());
  };

  //console.log(todoItem);
  //console.log("ABC:", todoItem.todo);
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
            ${taskItem.isDone ? "task-done" : ""}
          `}
        >
          {taskItem.todo}

          <div className="date">{dateConverter(taskItem.date)}</div>
        </div>
      )}

      <div className="action-icons">
        <Button
          label="Mark Done"
          className="button"
          onClick={() => handleTaskDone(taskItem.id)}
        />
        <Button
          label="Edit"
          className="button edit"
          onClick={() => enableEditing(taskItem.id)}
        />
        {/* <Button
          label="Delete"
          className="button delete"
          onClick={() => handleTaskDelete(taskItem.id)}
        /> */}
        <button
          type="button"
          className="button delete"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Delete
        </button>
      </div>

      <div
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
                  handleTaskDelete(taskItem.id);
                  //handleClose();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
