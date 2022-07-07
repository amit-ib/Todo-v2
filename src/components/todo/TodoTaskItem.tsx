import { TodoModal } from "../../models";

interface Props {
  todoSingleObj: TodoModal;
}

const SingleTodo = ({ todoSingleObj }: Props) => {
  return (
    <form>
      <div className="list-item">
        <span className="list-item-text">{todoSingleObj.todo}</span>
      </div>
    </form>
  );
};

export default SingleTodo;
