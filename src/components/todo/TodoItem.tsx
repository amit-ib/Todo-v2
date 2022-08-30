import { useState } from "react";
import Moment from "react-moment";
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
  const editTask = (e: any) => {
    console.log("User pressed: ", e.key);
    if (e.key === "Enter") {
      handleTaskEdit(e, todoItem.id, index);
    }
  };

  const defaultDate = new Date(editDate).toISOString().split("T")[0]; // yyyy-mm-dd
  return (
    <div className="list-item">
      {editMode ? (
        //If in edit mode then display Textbox
        <div className="edit-task-container">
          <input
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            onKeyPress={editTask}
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
        <span
          className={`list-item-text 
            ${todoItems[index].isDone ? "task-done" : ""}
          `}
        >
          {todoItems[index].todo}

          <div className="date">
            <Moment format="DD/MM/YYYY">{todoItems[index].date}</Moment>
          </div>
        </span>
      )}

      <div className="action-icons">
        <span onClick={() => handleTaskDone(index)}>Mark Done</span>
        <span
          className="button-edit"
          onClick={() => {
            if (!editMode && !todoItems[index].isDone) {
              setEditMode(!editMode);
            }
          }}
        >
          Edit
        </span>
        <span
          className="button-delete"
          onClick={() => handleTaskDelete(todoItems[index].id)}
        >
          Delete
        </span>
      </div>
    </div>
  );
};

export default TodoItem;
