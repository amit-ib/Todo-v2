import { TodoModal } from "../../models";

interface Props {
  todoSingleObj: TodoModal;
  todoArrayOfObj: TodoModal[];
  setTodos: React.Dispatch<React.SetStateAction<TodoModal[]>>; // is a function - copied from setTodos state
  index: number;
}

const SingleTodo = ({
  todoSingleObj,
  todoArrayOfObj,
  setTodos,
  index,
}: Props) => {
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
        {todoSingleObj.isDone ? (
          //Done item with strick out style
          <span className="list-item-text task-done">{todoSingleObj.todo}</span>
        ) : (
          // Normal list item - "Not Done"
          <span className="list-item-text">{todoSingleObj.todo}</span>
        )}

        <div className="action-icons">
          <span onClick={() => handleTaskDone(index)}>Mark Done</span>
        </div>
      </div>
    </form>
  );
};

export default SingleTodo;
