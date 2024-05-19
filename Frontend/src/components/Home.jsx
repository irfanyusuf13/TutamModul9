import React from 'react';
import backgroundImage from '../assets/background.jpg';

const Home = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-65"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="text-center bg-opacity-75 p-4 rounded z-10">
        <h2 className="text-6xl font-bold text-white">Welcome to notion lite</h2>
      </div>
    </div>
  );
};

export default Home;
