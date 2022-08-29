import { useEffect, useState } from "react";
import "./assets/scss/styles.scss";
import TodoForm from "./components/todo/TodoForm";
import TodoList from "./components/todo/TodoList";
import { TodoModal } from "./models";
import { UserModal } from "./models/user";
import { staticTodo } from "./mock-data/todo";
import Login from "./components/shared/Login";
import { gapi } from "gapi-script";

const clientId =
  "900579528323-mam6vmpqms78uujugfmfhqbuhrv0f5n6.apps.googleusercontent.com";

function App() {
  const [isLogedin, setIsLogedin] = useState({});
  var accessToken = window.localStorage.getItem("accessToken");
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
    console.log("isLogedin", isLogedin, accessToken);
  }, []);

  const [todos, setTodos] = useState<TodoModal[]>(staticTodo);
  const [userProfile, setuserProfile] = useState<UserModal | null>();

  return (
    <div>
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
            <TodoForm todos={todos} setTodos={setTodos} />
            <TodoList todos={todos} setTodos={setTodos} />
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
    </div>
  );
}

export default App;
