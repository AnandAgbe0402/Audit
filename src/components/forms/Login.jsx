import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Example validation
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    // TODO: Add real authentication logic here
    alert(`Logged in as ${email}`);
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
