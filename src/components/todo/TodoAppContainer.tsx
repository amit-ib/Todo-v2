import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { featchToDos, featchTodoConfig } from "../../services/axiosService";
import {
  setStatusCountAction,
  setTodoAction,
  setTodoConfigAction,
} from "../../store";
import Loader from "../shared/Loader";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { statesModal } from "../../store/todoReducer";
import { TodoModal } from "../../models";
import { ToDoStatus } from "../../models/status.model";
import Tost from "../shared/Tost";
import { TostType } from "../../models/toasts.model";
const TodoAppContainer = () => {
  const [loading, setLoading] = useState(false);
  const { tasks, statusCount, editTask } = useSelector(
    (state: statesModal) => state
  );
  const dispatch = useDispatch();

  const [activeId, setActiveId] = useState<number>(0);

  const [filter, setFilter] = useState<TodoModal[] | []>([]);

  const loadData = async () => {
    setLoading(true);
    await featchToDos().then((res) => {
      dispatch(setTodoAction(res.data.todos));
      delete res.data.todos;
      dispatch(setStatusCountAction(res.data));
    });
    await featchTodoConfig().then((res) =>
      dispatch(setTodoConfigAction(res.data))
    );
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    return () => {};
  }, []);

  const [tost, setTost] = useState<TostType>({
    tostState: false,
    tostMessage: "",
    tostType: "",
  });
  return (
    <>
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

      <div>
        <TodoForm
          todos={tasks}
          statusCount={statusCount}
          setActiveId={setActiveId}
          activeId={activeId}
          setFilter={setFilter}
          setLoading={setLoading}
          setTost={setTost}
          editTask={editTask}
        />

        <TodoList
          todos={activeId === ToDoStatus.ALL ? tasks : filter}
          setLoading={setLoading}
          setTost={setTost}
        />
        {tasks.length === 0 && (
          <div className="text-center p-3 error">No tasks found</div>
        )}
        {activeId !== ToDoStatus.ALL &&
          (tasks.length === 0 || filter.length === 0) && (
            <div className="text-center p-3 error">No tasks found</div>
          )}
      </div>
    </>
  );
};

export default TodoAppContainer;
