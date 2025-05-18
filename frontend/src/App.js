import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get("/todos");  // <-- relative URL
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text.trim()) return;
    await axios.post("/todos", { text });  // <-- relative URL
    setText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/todos/${id}`);    // <-- relative URL
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        <div className="flex space-x-2 mb-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-2 flex-1"
            placeholder="Enter a task"
          />
          <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id} className="flex justify-between items-center border-b py-2">
              <span>{todo.text}</span>
              <button onClick={() => deleteTodo(todo._id)} className="text-red-500">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
