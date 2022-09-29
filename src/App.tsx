import { useEffect } from "react";
import TodoForm from "./components/todo/TodoForm";
import TodoList from "./components/todo/TodoList";
import Login from "./components/auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { statesModal } from "./store/todoReducer";
import Button from "./components/shared/form/Button";
import { setTodoAction, loginTodoAction } from "./store";
import axiosInstance from "./axiosConfig";

function App() {
  const state = useSelector((state: statesModal) => state);
  const dispatch = useDispatch();
  let formTitle = state.isLogedin ? "Todo List" : "Todo Login";
  const accessToken = window.localStorage.getItem("accessToken");
  const userName = window.localStorage.getItem("userName")
    ? window.localStorage.getItem("userName")
    : "";

  const setIsLogedin = (loginStatus: boolean) => {
    dispatch(loginTodoAction(loginStatus));
  };

  useEffect(() => {
    setIsLogedin(accessToken ? true : false);
  }, [accessToken]);

  useEffect(() => {
    axiosInstance
      .get("/todos")
      .then((res) => dispatch(setTodoAction(res.data)));
  }, []);

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
            <Button label="Logout" onClick={onLogoutSuccess} varient="link" />
          </span>
        )}
      </div>
      <div className="container">
        <div className="todo-container">
          <h3 className="text-center">{formTitle}</h3>

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
