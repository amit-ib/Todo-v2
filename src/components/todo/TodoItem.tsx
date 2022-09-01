import { useState } from "react";
import moment from "moment";
import { TodoModal } from "../../models";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../shared/form/Button";
import { dateConverter } from "../../utils/helper";

interface Props {
  todoItems: TodoModal[];
  todoItem: TodoModal;
  setTodos: React.Dispatch<React.SetStateAction<TodoModal[]>>; // is a function - copied from setTodos state
  index: number;
}

interface editForm {
  task: string;
  date: string;
}

const TodoItem = ({ todoItems, todoItem, setTodos, index }: Props) => {
  // function to handel done icon
  const handleTaskDone = (index: number) => {
    let todos = [...todoItems];

    if (todos[index]) {
      todos[index].isDone = !todos[index].isDone;
    }
    setTodos(todos);
  };

  const taskItem = todoItems[index];

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<editForm>({
    defaultValues: {
      task: todoItems[index].todo,
      date: moment(new Date(todoItems[index].date)).format("YYYY-MM-DD"),
      //date: dateConverter(new Date(todoItems[index].date)),
    },
  });

  const onSubmit: SubmitHandler<editForm> = (data) => {
    let todos = [...todoItems];
    if (todos[index]) {
      todos[index].todo = data.task;
      todos[index].date = new Date(data.date);
    }
    setTodos(todos);
    setEditMode(false);
  };

  // State to check edit state(if already in edit mode)
  const [editMode, setEditMode] = useState<boolean>(false);

  // function to handel delete task
  const handleTaskDelete = (id: number) => {
    setTodos(todoItems.filter((todoItem) => todoItem.id !== id));
  };

  // Enabeling edit mode
  const enableEditing = () => {
    if (!taskItem.isDone) {
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
            ${taskItem.isDone ? "task-done" : ""}
          `}
        >
          {taskItem.todo}

          <div className="date">
            {/* {moment(taskItem.date).format("DD/MM/YYYY")} */}
            {dateConverter(taskItem.date)}
          </div>
        </div>
      )}

      <div className="action-icons">
        <span onClick={() => handleTaskDone(index)}>Mark Done</span>
        <span className="button-edit" onClick={enableEditing}>
          Edit
        </span>
        <span
          className="button-delete"
          onClick={() => handleTaskDelete(taskItem.id)}
        >
          Delete
        </span>
      </div>
    </div>
  );
};

export default TodoItem;
