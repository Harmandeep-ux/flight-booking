import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
  const [mode, setMode] = useState('signin');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Fixed endpoint URLs based on your working version
    const endpoint = mode === 'signin' ? '/user/signin' : '/user/signup';
    const url = `http://localhost:3000${endpoint}`;

    try {
      const { data } = await axios.post(url, formData);

      if (data.token) {
        localStorage.setItem('token', data.token);
        setMessage('Login successful!');
      } else {
        setMessage(data.msg || 'Done!');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error: ' + (error.response?.data?.msg || 'Try again'));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setMode('signin')}
          className={`px-4 py-2 mr-2 rounded ${mode === 'signin' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Sign In
        </button>
        <button
          onClick={() => setMode('signup')}
          className={`px-4 py-2 rounded ${mode === 'signup' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          {mode === 'signin' ? 'Login' : 'Register'}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
    </div>
  );
};

export default AuthForm;
