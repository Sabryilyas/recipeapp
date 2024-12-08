import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';

export function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('The password does not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setError('');
        setSuccessMessage('Registration successful! You can now log in.');
        // Optionally redirect to the login page
        // window.location.href = '/login';
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-3xl shadow-sm">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs mb-1">Your name *</label>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="w-full p-2 text-sm border rounded-lg"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-xs mb-1">&nbsp;</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="w-full p-2 text-sm border rounded-lg"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs mb-1">Email *</label>
            <input
              type="email"
              name="email"
              placeholder="abc@gmail.com"
              className="w-full p-2 text-sm border rounded-lg"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Phone number *</label>
            <input
              type="tel"
              name="phone"
              placeholder="011 2222 333"
              className="w-full p-2 text-sm border rounded-lg"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Password *</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 text-sm border rounded-lg"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              className={`w-full p-2 text-sm border rounded-lg ${error ? 'border-[#ff4e6e]' : ''}`}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {error && <p className="text-xs text-[#ff4e6e] mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-[#ff4e6e] text-white py-2 rounded-lg hover:bg-[#ff3956] text-sm font-medium"
          >
            Create Account
          </button>
        </form>
        {successMessage && (
          <p className="mt-4 text-center text-sm text-green-500">{successMessage}</p>
        )}
        <p className="mt-4 text-center text-xs">
          Already have an account?{' '}
          <Link to="/login" className="text-[#ff4e6e] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}




