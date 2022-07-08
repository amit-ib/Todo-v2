import { TodoModal } from "../../models";

interface Props {
  todoArrayOfObj: TodoModal[];
  setTodos: React.Dispatch<React.SetStateAction<TodoModal[]>>; // is a function - copied from setTodos state
  index: number;
}

const SingleTodo = ({ todoArrayOfObj, setTodos, index }: Props) => {
  const handleTaskDone = (index: number) => {
    let todos = [...todoArrayOfObj];

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
            ${todoArrayOfObj[index].isDone ? "task-done" : ""}
          `}
        >
          {todoArrayOfObj[index].todo}
        </span>

        <div className="action-icons">
          <span onClick={() => handleTaskDone(index)}>Mark Done</span>
        </div>
      </div>
    </form>
  );
};

export default SingleTodo;
