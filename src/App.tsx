import { useEffect, useState } from "react";
import TodoForm from "./components/todo/TodoForm";
import TodoList from "./components/todo/TodoList";
import Login from "./components/auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { statesModal } from "./store/todoReducer";
import Button from "./components/shared/form/Button";
import {
  setTodoAction,
  loginTodoAction,
  setCategoryAction,
  setStatusAction,
} from "./store";
import axiosInstance from "./axiosConfig";
import Loader from "./components/shared/Loader";
import Tost from "./components/shared/Tost";
import { TodoModal } from "./models";

export interface tostType {
  tostState: boolean;
  tostMessage: string;
  tostType: string;
}
export interface statusCount {
  pending: number;
  inProgress: number;
  completed: number;
  archived: number;
}

function App() {
  const state = useSelector((state: statesModal) => state);

  // const [statusCount, setstatusCount] = useState<statusCount>();
  const [activeId, setActiveId] = useState<Number>(0);
  const [loading, setLoading] = useState(false);
  const [tost, setTost] = useState<tostType>({
    tostState: false,
    tostMessage: "",
    tostType: "",
  });
  const dispatch = useDispatch();
  let formTitle = state.isLogedin ? "Todo List" : "Todo Login";
  let categories = state.categories;
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
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await axiosInstance.get("/todos").then((res) => {
      dispatch(setTodoAction(res.data));
    });
    await axiosInstance
      .get("/category")
      .then((res) => dispatch(setCategoryAction(res.data)));
    await axiosInstance
      .get("/status")
      .then((res) => dispatch(setStatusAction(res.data)));
    setLoading(false);
  };

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
      {tost.tostState ? (
        <Tost
          delay={3000}
          setTost={setTost}
          tostType={tost.tostType}
          tostMessage={tost.tostMessage}
        />
      ) : (
        ""
      )}
      <div className="container">
        <div className="todo-container">
          {loading ? <Loader /> : ""}
          <h3 className="text-center">{formTitle}</h3>
          {state.isLogedin && (
            <div>
              <TodoForm
                todos={state.tasks}
                categories={state.categories}
                setLoading={setLoading}
                setTost={setTost}
                status={state.status}
                setActiveId={setActiveId}
                activeId={activeId}
                editTask={state.editTask}
              />
              <TodoList
                todos={
                  state.filteredList.length !== 0
                    ? state.filteredList
                    : state.tasks
                }
                setLoading={setLoading}
                setTost={setTost}
                activeId={activeId}
              />
            </div>
          )}
          {!state.isLogedin && (
            <Login
              isLogedin={state.isLogedin}
              setLoading={setLoading}
              setIsLogedin={setIsLogedin}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
