import { useSelector } from "react-redux";
import { statesModal } from "./store/todoReducer";
import Header from "./components/shared/Header";
import TodoAppContainer from "./components/todo/TodoAppContainer";
import Login from "./components/auth/Login";
import axiosInstance from "./axiosConfig";
function App() {
  const isLogedin = useSelector((state: statesModal) => state.isLogedin);
  const formTitle = isLogedin ? "Todo List" : "Todo Login";
  if (isLogedin) {
    const AUTH_TOKEN = window.localStorage.getItem("accessToken");
    axiosInstance.defaults.headers.common["Authorization"] =
      "Bearer " + AUTH_TOKEN;
  }
  return (
    <>
      <Header />
      <div className="todo-container">
        <h3 className="text-center">{formTitle}</h3>
        {!isLogedin ? <Login /> : <TodoAppContainer />}
      </div>
    </>
  );
}

export default App;
