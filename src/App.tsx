import { useEffect, useState } from "react";
import "./assets/scss/styles.scss";
import TodoForm from "./components/todo/TodoForm";
import TodoList from "./components/todo/TodoList";
import { TodoModal } from "./models";
import { UserModal } from "./models/user";
import { staticTodo } from "./mock-data/todo";
import Login from "./components/shared/Login";
import { gapi } from "gapi-script";

const clientId = process.env.REACT_APP_CLIENTID;

function App() {
  const [isLogedin, setIsLogedin] = useState({});
  var accessToken = window.localStorage.getItem("accessToken");
  console.log(clientId);
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  useEffect(() => {
    setIsLogedin(accessToken ? true : false);
  }, []);

  const [todos, setTodos] = useState<TodoModal[]>(staticTodo);
  const [userProfile, setuserProfile] = useState<UserModal | null>();

  // state to handle filters
  const [filter, setFilter] = useState<string>("");
  console.log(filter);

  return (
    <>
      <div className="welcome-text">
        {isLogedin && (
          <span>
            Welcome - {userProfile?.name} |{" "}
            <Login
              isLogedin={isLogedin}
              setIsLogedin={setIsLogedin}
              setuserProfile={setuserProfile}
            />
          </span>
        )}
      </div>
      <div className="container">
        <h3 className="text-center">Todo List</h3>

        {isLogedin && (
          <div>
            <TodoForm todos={todos} setTodos={setTodos} setFilter={setFilter} />
            <TodoList todos={todos} setTodos={setTodos} filter={filter} />
          </div>
        )}

        {!isLogedin && (
          <Login
            isLogedin={isLogedin}
            setIsLogedin={setIsLogedin}
            setuserProfile={setuserProfile}
          />
        )}
      </div>
    </>
  );
}

export default App;
