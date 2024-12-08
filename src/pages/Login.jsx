import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <h1 className="text-2xl font-semibold mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email address</label>
            <input
              type="email"
              placeholder="john@gmail.com"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4e6e] focus:border-transparent"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff4e6e] focus:border-transparent ${
                error ? 'border-[#ff4e6e]' : ''
              }`}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            {error && (
              <p className="text-xs text-[#ff4e6e] mt-1">
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#ff4e6e] text-white py-2 rounded-lg hover:bg-[#ff3956] transition-colors"
          >
            SIGN IN
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#ff4e6e] hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

