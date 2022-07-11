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

  return (
    <form>
      <div className="list-item">
        <span
          className={`list-item-text 
            ${todoItems[index].isDone ? "task-done" : ""}
          `}
        >
          {todoItems[index].todo}
        </span>

        <div className="action-icons">
          <span onClick={() => handleTaskDone(index)}>Mark Done</span>
        </div>
      </div>
    </form>
  );
};

export default TodoItem;
