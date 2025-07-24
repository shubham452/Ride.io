import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');  // <-- Add this state

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const signInUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', userData);
      console.log('login successful');
      return response.data;
    } catch (err) {
      // Check for a user-not-found condition - adjust based on your backend's error response
      if (err.response && err.response.status === 404) {
        setErrorMessage("User not found. Please sign up.");
      } else {
        setErrorMessage('Login failed. Please try again later.');
      }
      console.log("error during Login", err.response ? err.response.data : err.message);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error
    try {
      const response = await signInUser(input);
      if (response) {
        navigate('/home');
      }
    } catch (error) {
      console.log('Sign in error: ', error);
      // errorMessage state is already set inside signInUser
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={input.email}
              onChange={handleInput}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={input.password}
              onChange={handleInput}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errorMessage && (
            <p className="text-center text-red-600 font-semibold">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Log In
          </button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
