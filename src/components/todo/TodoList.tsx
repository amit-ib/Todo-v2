import { TodoModal } from "../../models";
import TodoItem from "./TodoItem";
export interface Props {
  todos: TodoModal[];
  setFilter?: React.Dispatch<React.SetStateAction<string>>; // copied from setTodos state
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const TodoList = ({ todos, setLoading }: Props) => {
  let filteredList = todos;
  return (
    <>
      {filteredList.map((todoItem, id) => (
        <TodoItem
          key={id}
          id={todoItem.id}
          todoItem={todoItem}
          setLoading={setLoading}
        />
      ))}
    </>
  );
};

export default TodoList;
