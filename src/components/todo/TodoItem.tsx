import Button from "../shared/form/Button";
import { TodoModal } from "../../models";
import { dateConverter, loggedInUserData } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  editTodoAction,
  setStatusCountAction,
  setTodoAction,
} from "../../store";
import Confirm from "../shared/Confirm";
import axiosInstance from "../../axiosConfig";
import { ToDoStatus } from "../../models/status.model";
import { TostType } from "../../models/toasts.model";
import { featchToDos, updateToDos } from "../../services/axiosService";
import { statesModal } from "../../store/todoReducer";
interface Props {
  todoItem: TodoModal;
  id: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTost: React.Dispatch<React.SetStateAction<TostType>>;
  deleteTaskHandeler: Function;
}

const TodoItem = ({
  todoItem,
  setLoading,
  setTost,
  deleteTaskHandeler,
}: Props) => {
  const { todoConfig } = useSelector((state: statesModal) => state);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showPriorityOptions, setShowPriorityOptions] = useState(false);
  const [taskPriority, setTaskPriority] = useState<string>("low");
  var todoData = {
    id: todoItem.id,
    title: todoItem.title,
    dueDate: todoItem.dueDate,
    category: todoItem.category,
    status: todoItem.status,
    createdBy: todoItem.createdBy,
    priority: todoItem.priority,
  };
  useEffect(() => {
    if (todoItem) {
      setTodo(todoData);
      todoConfig.priority.forEach((el) => {
        if (el.id === Number(todoItem.priority)) {
          setTaskPriority(el.title.toLocaleLowerCase());
        }
      });
    }
  }, [todoItem, todoConfig.priority]);

  const [todo, setTodo] = useState(todoData);

  const priorityHandler = async (priorityId: number) => {
    let updateData = {
      ...todoItem,
      priority: priorityId,
    };
    await updateToDos(todo.id, updateData);
    await featchToDos().then((res) => {
      dispatch(setTodoAction(res.data.todos));
      delete res.data.todos;
      dispatch(setStatusCountAction(res.data));
    });
  };

  const toggleStatusHandler = async () => {
    let updateData = {
      ...todoItem,
      status:
        todo.status === ToDoStatus.COMPLETED
          ? ToDoStatus.PENDING
          : ToDoStatus.COMPLETED,
    };
    setLoading(true);
    await updateToDos(todo.id, updateData);
    await featchToDos().then((res) => {
      dispatch(setTodoAction(res.data.todos));
      delete res.data.todos;
      dispatch(setStatusCountAction(res.data));
    });
    setLoading(false);
  };

  const editTaskHandeler = async () => {
    setLoading(true);
    await axiosInstance.get(`/todo/${todoItem.id}`).then((res) => {
      dispatch(editTodoAction(res.data));
    });
    setLoading(false);
  };

  const toggleShowPriorityOptions = () => {
    if (todo.status !== 3) {
      setShowPriorityOptions((showPriorityOptions) => !showPriorityOptions);
    } else {
      alert("You can not change the priority of completed task ");
    }
  };

  return (
    <div className="list-item" id={String(todoItem.id)}>
      <div
        className={`list-item-text 
          ${todoItem.status === ToDoStatus.COMPLETED ? "task-done" : ""}
        `}
      >
        <span
          onClick={toggleStatusHandler}
          className={`todo-status-icon-${
            todo.status === ToDoStatus.COMPLETED ? "checked" : "unchecked"
          }`}
        ></span>
        <span className="todo-title">{todoItem.title}</span>
        <div className="date">{dateConverter(todoItem.dueDate)}</div>
      </div>
      <div className="action-icons">
        <span
          className={`task-priority-indicator priority-${taskPriority} ${
            showPriorityOptions ? "active" : ""
          }`}
          onClick={toggleShowPriorityOptions}
        >
          {todoConfig.priority.map((priorities, id) => {
            return (
              <span
                key={priorities.id}
                className={`priority-${priorities.title.toLowerCase()}`}
                onClick={() => {
                  setTaskPriority(priorities.title.toLowerCase());
                  priorityHandler(priorities.id);
                }}
              >
                {priorities.title}
              </span>
            );
          })}
        </span>
        <Button
          label="Edit"
          className="link red"
          disabled={
            Number(todoItem.createdBy) !== loggedInUserData().id ||
            todoItem.status === ToDoStatus.COMPLETED
              ? true
              : false
          }
          onClick={editTaskHandeler}
        />
        <Button
          label="Delete"
          className="link blue"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => {
            setShowModal(true);
          }}
        />
      </div>
      <Confirm
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        todo={todoItem}
        text="Are you sure you want to delete this task?"
        title="Delete Task Confirmation"
        buttonLabel="Delete"
        buttonAction={deleteTaskHandeler}
      />
    </div>
  );
};

export default TodoItem;
