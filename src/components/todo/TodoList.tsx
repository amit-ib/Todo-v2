import { TodoModal } from "../../models";
import TodoItem from "./TodoItem";
export interface Props {
  todos: TodoModal[];
  filter: string;
}
const TodoList = ({ todos, filter }: Props) => {
  let filteredList = todos;

  if (filter === "done") {
    filteredList = todos.filter((todoItem) => todoItem.isDone === true);
  } else if (filter === "pending") {
    filteredList = todos.filter((todoItem) => todoItem.isDone === false);
  } else {
    filteredList = todos;
  }

  return (
    <>
      {filteredList.map((todoItem) => (
        <TodoItem id={todoItem.id} todoItem={todoItem} />
      ))}
    </>
  );
};

export default TodoList;
