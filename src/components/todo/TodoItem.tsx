import { TodoModal } from "../../models";

interface Props {
  todoItems: TodoModal[];
  setTodos: React.Dispatch<React.SetStateAction<TodoModal[]>>; // is a function - copied from setTodos state
  index: number;
}

const TodoItem = ({ todoItems, setTodos, index }: Props) => {
  const handleTaskDone = (index: number) => {
    let todos = [...todoItems];

    if (todos[index]) {
      todos[index].isDone = !todos[index].isDone;
    }
    setTodos(todos);
  };

  // function to handel delete task
  const handleTaskDelete = (id: number) => {
    setTodos(todoItems.filter((todoItem) => todoItem.id !== id));
  };

  return (
    <div className="list-item">
      <span
        className={`list-item-text 
            ${todoItems[index].isDone ? "task-done" : ""}
          `}
      >
        {todoItems[index].todo}
        <div className="date">13-07-2022</div>
      </span>

      <div className="action-icons">
        <span onClick={() => handleTaskDone(index)}>Mark Done</span>
        <span className="button-edit">Edit</span>
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
