import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure, clearError } from '@store/slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    
    // Validation
    if (!email || !password) {
      dispatch(loginFailure('Email and password are required.'));
      return;
    }

    dispatch(loginStart());

    try {
      // TODO: Replace with real API call
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      if (email === 'admin@tvs.com' && password === 'admin123') {
        const userData = {
          id: 1,
          email: email,
          name: 'Anand Sharma',
          role: 'Admin'
        };
        dispatch(loginSuccess(userData));
        navigate('/dashboard');
      } else {
        dispatch(loginFailure('Invalid email or password'));
      }
    } catch (err) {
      dispatch(loginFailure('Login failed. Please try again.'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <div className="mb-2 text-red-600">{error}</div>}
      <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
