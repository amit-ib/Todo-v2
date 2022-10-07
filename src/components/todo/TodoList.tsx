import { tostType } from "../../App";
import { TodoModal } from "../../models";
import TodoItem from "./TodoItem";
export interface Props {
  todos: TodoModal[];
  setFilter?: React.Dispatch<React.SetStateAction<string>>; // copied from setTodos state
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTost: React.Dispatch<React.SetStateAction<tostType>>;
}
const TodoList = ({ todos, setLoading, setTost }: Props) => {
  return (
    <>
      {todos.map((todoItem, id) => (
        <TodoItem
          key={id}
          id={todoItem.id}
          todoItem={todoItem}
          setLoading={setLoading}
          setTost={setTost}
        />
      ))}
    </>
  );
};

export default TodoList;
