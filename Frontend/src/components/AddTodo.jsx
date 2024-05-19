import React, { useState } from 'react';
import axios from 'axios';

const AddTodo = () => {
  const [description, setDescription] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/todo', { description });
      setStatusMessage('Task added');
      setDescription(''); 
    } catch (error) {
      console.error('There was an error adding the task', error);
      setStatusMessage('Error adding task.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Add Task</h2>
      <form onSubmit={addTodo} className="space-y-4 w-full max-w-md">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Add
        </button>
      </form>
      {statusMessage && (
        <p className="mt-4 text-green-500">{statusMessage}</p>
      )}
    </div>
  );
};

export default AddTodo;
