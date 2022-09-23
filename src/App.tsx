import { useEffect, useState } from "react";
import TodoForm from "./components/todo/TodoForm";
import TodoList from "./components/todo/TodoList";
import { UserModal } from "./models/user";
import Login from "./components/shared/Login";
import { useSelector } from "react-redux";
import { gapi } from "gapi-script";
import { todoList } from "./store/todoReducer";

const clientId = process.env.REACT_APP_CLIENTID;

function App() {
  const state = useSelector((state: todoList) => state);
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

  const [userProfile, setuserProfile] = useState<UserModal | null>();

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
        <div className="todo-container">
          <h3 className="text-center">Todo List</h3>

          {isLogedin && (
            <div>
              <TodoForm />
              <TodoList todos={state.tasks} />
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
    </>
  );
}

export default App;
