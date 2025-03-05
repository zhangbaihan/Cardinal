'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Profile() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, loading, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  // If we're not loading and the user isn't authenticated, we're redirecting
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold mb-1">Account Information</h2>
          <p className="text-gray-600">Manage your account details</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <p className="text-gray-900 font-medium">{user?.name || 'Not provided'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-gray-900 font-medium">{user?.email}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
            <p className="text-gray-900 font-medium">{user?.id}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold mb-1">Survey Participation</h2>
          <p className="text-gray-600">Your survey status and contributions</p>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700">You have completed the survey. Thank you for your participation!</p>
          <button 
            className="mt-4 bg-cardinal-red hover:bg-cardinal-dark text-white py-2 px-4 rounded transition-colors duration-300"
            onClick={() => router.push('/survey')}
          >
            Review Your Survey
          </button>
        </div>
      </div>
    </div>
  );
} 