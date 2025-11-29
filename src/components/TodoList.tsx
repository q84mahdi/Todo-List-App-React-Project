import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { getAsyncTodos } from "../Features/Todo/todoSlice";
import type { AppDispatch, RootState } from "../Features/store";

const TodoList: React.FC = () => {
  const { loading, todos, error } = useSelector(
    (state: RootState) => state.todos
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncTodos());
  }, [dispatch]);

  if (loading) return <p>Data Loading ...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>TodoList</h2>

      <ul className="list-group">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
