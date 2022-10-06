import { useEffect, useState } from "react";
import { tostType } from "../../App";
import { TodoModal } from "../../models";
import TodoItem from "./TodoItem";
export interface Props {
  todos: TodoModal[];
  activeId: Number;
  setFilter?: React.Dispatch<React.SetStateAction<string>>; // copied from setTodos state
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTost: React.Dispatch<React.SetStateAction<tostType>>;
}
const TodoList = ({ todos, setLoading, setTost, activeId }: Props) => {
  // const [filteredList, setfilteredList] = useState<TodoModal[]>(todos);

  // const filterSwitch = (stausId: Number) => {
  //   setfilteredList(todos.filter((todoItem) => todoItem.status === stausId));
  // };

  // useEffect(() => {
  //   if (activeId !== 0) {
  //     filterSwitch(activeId);
  //   } else {
  //     setfilteredList(todos);
  //   }
  // }, [activeId, todos]);

  return (
    <>
      {/* {filteredList.map((todoItem, id) => ( */}
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
