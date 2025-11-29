import { useDispatch } from "react-redux";
import { deleteAsyncTodo, toggleAsyncTodo } from "../Features/Todo/todoSlice";
import type { AppDispatch } from "../Features/store";

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center gap-1">
          <input
            onChange={() =>
              dispatch(toggleAsyncTodo({ id, completed: !completed }))
            }
            type="checkbox"
            className="mr-3"
            checked={completed}
          ></input>

          <span>{title}</span>
        </span>

        <button
          onClick={() => dispatch(deleteAsyncTodo({ id }))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
