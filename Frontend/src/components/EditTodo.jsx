import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditTodo = () => {
  const { id } = useParams();
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('incomplete');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      const result = await axios.get(`http://localhost:5000/todo/${id}`);
      setDescription(result.data.description);
      setStatus(result.data.status);
    };

    fetchTodo();
  }, [id]);

  const updateTodo = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/todo/${id}`, { description, status });
    navigate('/todo');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>
      <form onSubmit={updateTodo} className="space-y-4">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
