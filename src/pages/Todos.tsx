
import { useEffect, useState } from "react";
import { getTodos } from "../services/todoService";
import type { Todo } from "../services/todoService";

function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.log(error);
      setError("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Todos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <h2 className="text-xl font-semibold">{todo.name}</h2>

            <p className="text-gray-500 mt-2">
              {todo.description}
            </p>

            <p className="mt-3">
              Status: {todo.isCompleted ? "Completed" : "In progress"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todos;
