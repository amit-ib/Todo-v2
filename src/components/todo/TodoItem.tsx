import { TodoModal } from "../../models";
import { dateConverter } from "../../utils/helper";
interface Props {
  todoItem: TodoModal;
  id: number;
}

const TodoItem = ({ todoItem }: Props) => {

  return (
    <div className="list-item">
      <div
        className={`list-item-text 
            ${todoItem.isDone ? "task-done" : ""}
          `}
      >
        {todoItem.todo}

        <div className="date">{dateConverter(todoItem.date)}</div>
      </div>

      <div className="action-icons">
        <span>Mark Done</span>
        <span className="button-edit">Edit</span>
        <span className="button-delete">Delete</span>
      </div>
    </div>
  );
};

export default TodoItem;
