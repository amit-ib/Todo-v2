import { TodoModal, CategoryModal } from "../../models";
import TodoItem from "./TodoItem";
export interface Props {
  todos: TodoModal[];
  setFilter?: React.Dispatch<React.SetStateAction<string>>; // copied from setTodos state
}
const TodoList = ({ todos }: Props) => {
  let filteredList = todos;
  return (
    <>
      {filteredList.map((todoItem, id) => (
        <TodoItem key={id} id={todoItem.id} todoItem={todoItem} />
      ))}
    </>
  );
};

export default TodoList;
