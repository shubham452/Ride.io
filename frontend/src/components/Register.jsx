import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signUpUser = async(userData)=>{
    try {
      const response = await axios.post('http://localhost:3000/api/register',userData);
      console.log("signed up sucessfully", response);
      return response.data;
    } catch (error) {
      console.log("error during signup", error.response ? error.response.data : err.message);
          throw new Error('Signup failed. Please try again later');
    }
  }
  
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(input);
    try {
      const response = await signUpUser(input);
      console.log(response);
      if(response)
      {
        navigate('/login')
      }
    } catch (error) {
      console.log("sign up error", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={input.username}
              placeholder="Enter your username"
              onChange={handleInput}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={input.email}
              placeholder="Enter your email"
              onChange={handleInput}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={input.password}
              placeholder="Enter your password"
              onChange={handleInput}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white py-2 rounded-md font-semibold"
          >
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-400">
            Already a user?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
