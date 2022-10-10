import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statesModal } from "./store/todoReducer";

import { loginTodoAction } from "./store";
import Header from "./components/shared/Header";
import TodoAppContainer from "./components/todo/TodoAppContainer";

export interface tostType {
  tostState: boolean;
  tostMessage: string;
  tostType: string;
}
function App() {
  const state = useSelector((state: statesModal) => state);

  const dispatch = useDispatch();

  const accessToken = window.localStorage.getItem("accessToken");

  const setIsLogedin = (loginStatus: boolean) => {
    dispatch(loginTodoAction(loginStatus));
  };

  useEffect(() => {
    setIsLogedin(accessToken ? true : false);
  }, [accessToken]);

  return (
    <>
      <Header setIsLogedin={setIsLogedin} isLogedin={state.isLogedin} />

      <div className="container">
        <TodoAppContainer state={state} setIsLogedin={setIsLogedin} />
      </div>
    </>
  );
}

export default App;
