import { TodoModal } from "../../models";
import { TostType } from "../../models/toasts.model";
import TodoItem from "./TodoItem";
export interface Props {
  todos: TodoModal[];
  setFilter?: React.Dispatch<React.SetStateAction<string>>; // copied from setTodos state
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTost: React.Dispatch<React.SetStateAction<TostType>>;
}
const TodoList = ({ todos, setLoading, setTost }: Props) => {
  return (
    <div className="list-container">
      {todos.map((todoItem, id) => (
        <TodoItem
          key={id}
          id={todoItem.id}
          todoItem={todoItem}
          setLoading={setLoading}
          setTost={setTost}
        />
      ))}
    </div>
  );
};

export default TodoList;
