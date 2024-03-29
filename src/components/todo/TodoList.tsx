import { TodoModal } from "../../models";
import { TostType } from "../../models/toasts.model";
import TodoItem from "./TodoItem";
import { useState } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import axiosInstance from "../../axiosConfig";
import { useDispatch } from "react-redux";
import { setStatusCountAction, setTodoAction } from "../../store";
import { ToDoStatus } from "../../models/status.model";
import { featchToDos, updateToDos } from "../../services/axiosService";
import { loggedInUserData } from "../../utils/helper";
export interface Props {
  todos: TodoModal[];
  setFilter?: React.Dispatch<React.SetStateAction<string>>; // copied from setTodos state
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTost: React.Dispatch<React.SetStateAction<TostType>>;
}

const TodoList = ({ todos, setLoading, setTost }: Props) => {
  // const userData = window.localStorage.getItem("userData")
  //   ? JSON.parse(window.localStorage.getItem("userData") || "{}")
  //   : "";

  const dispatch = useDispatch();
  const [swiperLabel, setSwiperLabel] = useState<string>();
  const [swiperClass, setSwiperClass] = useState<string>();

  const deleteTaskHandeler = async (todoItem: TodoModal) => {
    let ref = document.getElementById(`${todoItem.id}`);
    ref?.classList.add("delete-animate");
    setSwiperLabel("Deleting...");
    await axiosInstance.delete(`/todo/${todoItem.id}`);
    await featchToDos().then((res) => {
      dispatch(setTodoAction(res.data.todos));
      delete res.data.todos;
      dispatch(setStatusCountAction(res.data));
    });
    ref?.classList.remove("delete-animate");
    setTost({
      tostState: true,
      tostMessage: "Task Deleted Successfully",
      tostType: "success",
    });
  };

  const setAsArchive = async (todoItem: TodoModal) => {
    let updateData = {
      ...todoItem,
      status: ToDoStatus.ARCHIVED,
    };
    let ref = document.getElementById(`${todoItem.id}`);
    ref?.classList.add("delete-animate");
    await updateToDos(todoItem.id, updateData);
    await featchToDos().then((res) => {
      dispatch(setTodoAction(res.data.todos));
      delete res.data.todos;
      dispatch(setStatusCountAction(res.data));
    });
    ref?.classList.remove("delete-animate");
  };

  const leadingActions = (TodoItem: TodoModal) => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          setAsArchive(TodoItem);
          setSwiperLabel("Archiving...");
          setSwiperClass("swiper-left-bg");
        }}
      >
        Archive
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (TodoItem: TodoModal) => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          deleteTaskHandeler(TodoItem);
          setSwiperClass("swiper-right-bg");
        }}
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <div className="list-container">
      <SwipeableList>
        {todos.map((todoItem, id) => (
          <SwipeableListItem
            trailingActions={trailingActions(todoItem)}
            leadingActions={
              Number(todoItem.createdBy) === loggedInUserData().id
                ? leadingActions(todoItem)
                : null
            }
            fullSwipe={true}
            key={id}
          >
            <label className={`swiper-status-label ${swiperClass}`}>
              {swiperLabel}
            </label>
            <TodoItem
              id={todoItem.id}
              todoItem={todoItem}
              deleteTaskHandeler={deleteTaskHandeler}
              setLoading={setLoading}
              setTost={setTost}
            />
          </SwipeableListItem>
        ))}
      </SwipeableList>
    </div>
  );
};

export default TodoList;
