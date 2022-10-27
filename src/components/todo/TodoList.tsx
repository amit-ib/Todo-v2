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
import { setTodoAction } from "../../store";
import { ToDoStatus } from "../../models/status.model";
export interface Props {
  todos: TodoModal[];
  setFilter?: React.Dispatch<React.SetStateAction<string>>; // copied from setTodos state
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTost: React.Dispatch<React.SetStateAction<TostType>>;
}

const TodoList = ({ todos, setLoading, setTost }: Props) => {
  const userData = window.localStorage.getItem("userData")
    ? JSON.parse(window.localStorage.getItem("userData") || "{}")
    : "";

  const dispatch = useDispatch();
  const [swiperLabel, setSwiperLabel] = useState<string>();
  const [swiperClass, setSwiperClass] = useState<string>();

  const deleteTaskHandeler = async (todoItem: TodoModal) => {
    let ref = document.getElementById(`${todoItem.id}`);
    ref?.classList.add("delete-animate");
    setSwiperLabel("Deleting...");
    await axiosInstance.delete(`/todo/${todoItem.id}`);
    await axiosInstance
      .get("/todos")
      .then((res) => dispatch(setTodoAction(res.data.todos)));
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
    await axiosInstance
      .put(`/todo/${todoItem.id}`, updateData)
      .then(async (res) => {
        await axiosInstance
          .get("/todos")
          .then((res) => dispatch(setTodoAction(res.data.todos)));
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
              Number(todoItem.createdBy) === userData.id
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
              userData={userData}
            />
          </SwipeableListItem>
        ))}
      </SwipeableList>
    </div>
  );
};

export default TodoList;
