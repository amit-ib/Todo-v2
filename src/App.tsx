import { useState } from "react";
import "./assets/scss/styles.scss";
import TodoForm from "./components/todo/TodoForm";
import TodoList from "./components/todo/TodoList";
import { TodoModal } from "./models";
import { staticTodo } from "./mock-data/todo";
function App() {
  const [todos, setTodos] = useState<TodoModal[]>(staticTodo);
  return (
    <div className="container">
      <h3 className="text-center">Todo List</h3>
      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
