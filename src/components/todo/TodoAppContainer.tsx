import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../../axiosConfig";
import { setCategoryAction, setStatusAction, setTodoAction } from "../../store";
import Login from "../auth/Login";
import Loader from "../shared/Loader";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { statesModal } from "../../store/todoReducer";
import { TodoModal } from "../../models";
import { ToDoStatus } from "../../models/status.model";
import { tostType } from "../../App";
import Tost from "../shared/Tost";
interface PropsType {
  state: statesModal;
  setIsLogedin: Function;
}

const TodoAppContainer = ({ state, setIsLogedin }: PropsType) => {
  const dispatch = useDispatch();

  const [activeId, setActiveId] = useState<Number>(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<TodoModal[] | []>([]);
  let formTitle = state.isLogedin ? "Todo List" : "Todo Login";

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await axiosInstance
      .get("/todos")
      .then((res) => dispatch(setTodoAction(res.data)));
    await axiosInstance
      .get("/category")
      .then((res) => dispatch(setCategoryAction(res.data)));
    await axiosInstance
      .get("/status")
      .then((res) => dispatch(setStatusAction(res.data)));
    setLoading(false);
  };
  const [tost, setTost] = useState<tostType>({
    tostState: false,
    tostMessage: "",
    tostType: "",
  });

  return (
    <div className="todo-container">
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
      {loading ? <Loader /> : ""}
      <h3 className="text-center">{formTitle}</h3>
      {state.isLogedin && (
        <div>
          <TodoForm
            todos={state.tasks}
            status={state.status}
            setActiveId={setActiveId}
            activeId={activeId}
            setFilter={setFilter}
            setLoading={setLoading}
          />

          <TodoList
            todos={activeId === ToDoStatus.ALL ? state.tasks : filter}
            setLoading={setLoading}
            setTost={setTost}
          />
          {state.tasks.length === 0 && (
            <div className="text-center p-3 error">No tasks found</div>
          )}
          {activeId !== ToDoStatus.ALL &&
            (state.tasks.length === 0 || filter.length === 0) && (
              <div className="text-center p-3 error">No tasks found</div>
            )}
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
  );
};

export default TodoAppContainer;
