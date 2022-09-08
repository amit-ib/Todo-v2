import { useState } from "react";
import { TodoModal } from "../../models";
import TodoItem from "./TodoItem";
import moment from "moment";
import { SubmitHandler } from "react-hook-form";
export interface Props {
  todos: TodoModal[];
  setTodos: React.Dispatch<React.SetStateAction<TodoModal[]>>; // copied from setTodos state
  setFilter?: React.Dispatch<React.SetStateAction<string>>; // copied from setTodos state
  filter?: string;
}

interface editForm {
  task: string;
  date: string;
}

const TodoList = ({ todos, setTodos, filter }: Props) => {
  let filteredList = todos;
  if (filter === "done") {
    filteredList = todos.filter((todoItem) => todoItem.isDone === true);
  } else if (filter === "pending") {
    filteredList = todos.filter((todoItem) => todoItem.isDone === false);
  } else {
    filteredList = todos;
  }
  //console.log(filteredList);

  // function to handel done icon
  const handleTaskDone = (id: number) => {
    let todoList = [...todos];

    todoList.forEach((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
    });
    setTodos(todoList);
  };

  // function to handel delete task
  const handleTaskDelete = (id: number) => {
    setTodos(todos.filter((todoItem) => todoItem.id !== id));
  };

  // State to check edit state(if already in edit mode)
  //const [editMode, setEditMode] = useState<boolean>(false);

  const onSubmit = (data: editForm, id: number) => {
    let todoList = [...todos];
    todoList.forEach((item) => {
      if (id === item.id) {
        item.todo = data.task;
        item.date = moment(data.date).toDate();
      }
    });
    setTodos(todoList);
  };
  console.log(todos);
  return (
    <>
      {filteredList.map((todoItem) => (
        <TodoItem
          id={todoItem.id}
          todoItem={todoItem}
          handleTaskDelete={handleTaskDelete}
          handleTaskDone={handleTaskDone}
          handleEdit={onSubmit}
          //todoItems={todos}
          //filteredItems={filteredList}
          //setTodos={setTodos}
          //index={index}
        />
      ))}
    </>
  );
};

export default TodoList;
