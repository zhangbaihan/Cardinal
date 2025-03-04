'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.email.endsWith('@stanford.edu')) {
      setError('Please use a Stanford email address');
      return;
    }

    // In a real app, here you would make an API call to register the user
    // For now, we'll simulate success and redirect to login

    // Redirect to login page with a success parameter
    router.push('/login?registered=true');
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Create Your Account</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cardinal-red focus:ring focus:ring-cardinal-light focus:ring-opacity-50"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Stanford Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="username@stanford.edu"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cardinal-red focus:ring focus:ring-cardinal-light focus:ring-opacity-50"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cardinal-red focus:ring focus:ring-cardinal-light focus:ring-opacity-50"
            required
          />
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cardinal-red focus:ring focus:ring-cardinal-light focus:ring-opacity-50"
            required
          />
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-cardinal-red hover:bg-cardinal-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
          >
            Register
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-cardinal-red hover:text-cardinal-dark">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
} 