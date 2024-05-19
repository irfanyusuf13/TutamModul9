import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Todo List Web</Link>
        </div>
        <div className="space-x-4">
          <Link to="/add" className="hover:underline">Add Todo</Link>
          <Link to="/todo" className="hover:underline">View Todo List</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
