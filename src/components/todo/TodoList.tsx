import { TodoModal } from "../../models";
import TodoItem from "./TodoItem";
export interface Props {
  todos: TodoModal[];
  setFilter?: React.Dispatch<React.SetStateAction<string>>; // copied from setTodos state
}
const TodoList = ({ todos }: Props) => {
  let filteredList = todos;
  return (
    <>
      {filteredList.map((todoItem, ind) => (
        <TodoItem key={ind} id={todoItem.id} todoItem={todoItem} />
      ))}
    </>
  );
};

export default TodoList;
