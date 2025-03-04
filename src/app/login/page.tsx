'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Component that uses useSearchParams
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  useEffect(() => {
    // Check if user was redirected from registration
    const registered = searchParams.get('registered');
    if (registered === 'true') {
      setShowSuccess(true);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, here you would authenticate the user
    // For now, we'll simulate success and redirect to survey
    
    // Redirect to survey page
    router.push('/survey');
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Log In to Cardinal</h1>
      
      {showSuccess && (
        <div className="mb-6 text-center">
          <div className="p-3 bg-green-50 text-green-700 rounded-md mb-6">
            Account created successfully! Please log in with your credentials.
          </div>
        </div>
      )}
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
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
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="remember-me"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-cardinal-red focus:ring-cardinal-light border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <div className="text-sm">
            <Link href="/forgot-password" className="text-cardinal-red hover:text-cardinal-dark">
              Forgot your password?
            </Link>
          </div>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-cardinal-red hover:bg-cardinal-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
          >
            Log In
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-cardinal-red hover:text-cardinal-dark">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

// Loading fallback
function LoginLoading() {
  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Log In to Cardinal</h1>
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded mb-4"></div>
        <div className="h-10 bg-gray-200 rounded mb-4"></div>
        <div className="h-10 bg-gray-200 rounded mb-6"></div>
        <div className="h-12 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
} 