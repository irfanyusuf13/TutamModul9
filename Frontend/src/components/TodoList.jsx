import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const fetchTodo = async () => {
      const result = await axios.get('http://localhost:5000/todo');
      setTodo(result.data);
    };

    fetchTodo();
  }, []);

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todo/${id}`);
    setTodo(todo.filter(todo => todo.id !== id));
  };

  const updateStatus = async (id, newStatus) => {
    const updatedTodo = await axios.put(`http://localhost:5000/todo/${id}`, { status: newStatus });
    setTodo(todo.map(todo => (todo.id === id ? updatedTodo.data : todo)));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <ul className="space-y-2">
        {todo.map(todo => (
          <li key={todo.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
            <div>
              <span className="block text-lg">{todo.description}</span>
              <span className={`block text-sm ${todo.status === 'complete' ? 'text-green-500' : 'text-red-500'}`}>
                {todo.status}
              </span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => updateStatus(todo.id, todo.status === 'complete' ? 'incomplete' : 'complete')}
                className="text-blue-500 hover:underline"
              >
                Update Status
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
