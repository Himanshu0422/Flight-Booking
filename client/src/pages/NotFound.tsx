import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="mb-6">
          <img
            src={require('../assets/not-found.png')}
            alt="404 Not Found"
            className="w-96 mx-auto"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
        <p className="text-gray-600 mb-6">The page you are looking for does not exist or has been moved.</p>
        <button
          onClick={() => navigate('/home')}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
