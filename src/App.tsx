import "bootstrap/dist/css/bootstrap.min.css";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

function App() {

  return (
    <div className="container p-4">
      <h1 className="text-center">Todo App with RTK</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
}

export default App;
