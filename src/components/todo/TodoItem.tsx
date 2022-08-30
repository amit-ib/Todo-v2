import { useState } from "react";
import moment from "moment";
import { TodoModal } from "../../models";

interface Props {
  todoItems: TodoModal[];
  todoItem: TodoModal;
  setTodos: React.Dispatch<React.SetStateAction<TodoModal[]>>; // is a function - copied from setTodos state
  index: number;
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

  // State to check edit state(if already in edit mode)
  const [editMode, setEditMode] = useState<boolean>(false);
  //state to store edit value
  const [editTodo, setEditTodo] = useState<string>(todoItem.todo);
  //state to store date value
  const [editDate, setEditDate] = useState<Date>(todoItem.date);

  // function to handel delete task
  const handleTaskDelete = (id: number) => {
    setTodos(todoItems.filter((todoItem) => todoItem.id !== id));
  };

  // function to handel Edit icon // passing id //
  const handleTaskEdit = (e: React.FormEvent, id: number, index: number) => {
    e.preventDefault();
    let todos = [...todoItems];
    if (todos[index]) {
      todos[index].todo = editTodo;
      todos[index].date = editDate;
    }
    setTodos(todos);
    setEditMode(false);
  };

  // function to handel enter key in edit task textbox
  const finishEditingTask = (e: any) => {
    console.log("User pressed: ", e.key);
    if (e.key === "Enter") {
      handleTaskEdit(e, todoItem.id, index);
    }
  };

  // Enabeling edit mode
  const enableEditing = () => {
    if (!editMode && !taskItem.isDone) {
      setEditMode(!editMode);
    }
  };

  //const defaultDate = new Date(editDate).toISOString().split("T")[0]; // yyyy-mm-dd
  const defaultDate = moment(new Date(editDate)).format("YYYY-MM-DD");

  console.log("Date:", defaultDate);
  return (
    <div className="list-item">
      {editMode ? (
        //If in edit mode then display Textbox
        <div className="edit-task-container">
          <input
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            onKeyPress={finishEditingTask}
          />
          <input
            type="date"
            name=""
            id=""
            value={defaultDate}
            onChange={(e) => setEditDate(new Date(e.target.value))}
            onBlur={(e) => handleTaskEdit(e, todoItem.id, index)}
          />
        </div>
      ) : (
        <div
          className={`list-item-text 
            ${taskItem.isDone ? "task-done" : ""}
          `}
        >
          {taskItem.todo}

          <div className="date">
            {moment(taskItem.date).format("DD/MM/YYYY")}
          </div>
        </div>
      )}

      <div className="action-icons">
        <span onClick={() => handleTaskDone(index)}>Mark Done</span>
        <span
          className="button-edit"
          onClick={() => {
            enableEditing();
          }}
        >
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
