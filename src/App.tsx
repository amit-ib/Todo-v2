import { useEffect } from "react";
import TodoForm from "./components/todo/TodoForm";
import TodoList from "./components/todo/TodoList";
import Login from "./components/shared/Login";
import { useDispatch, useSelector } from "react-redux";
import { reducerSate } from "./store/todoReducer";
import Button from "./components/shared/form/Button";
import { loginTodoAction } from "./store";

function App() {
  const state = useSelector((state: reducerSate) => state);
  const dispatch = useDispatch();
  var accessToken = window.localStorage.getItem("accessToken");
  const userName = window.localStorage.getItem("userName")
    ? window.localStorage.getItem("userName")
    : "";
  const setIsLogedin = (bolval: boolean) => {
    dispatch(loginTodoAction(bolval));
  };

  useEffect(() => {
    setIsLogedin(accessToken ? true : false);
  }, [accessToken]);

  const onLogoutSuccess = () => {
    setIsLogedin(false);
    window.localStorage.removeItem("accessToken");
  };

  return (
    <>
      <div className="welcome-text">
        {state.isLogedin && (
          <span>
            Welcome - {userName} |{" "}
            <Button label="Logout" onClick={onLogoutSuccess} styles="link" />
          </span>
        )}
      </div>
      <div className="container">
        <div className="todo-container">
          {state.isLogedin ? (
            <h3 className="text-center">Todo List</h3>
          ) : (
            <h3 className="text-center">Login</h3>
          )}

          {state.isLogedin && (
            <div>
              <TodoForm />
              <TodoList todos={state.tasks} />
            </div>
          )}

          {!state.isLogedin && (
            <Login isLogedin={state.isLogedin} setIsLogedin={setIsLogedin} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
