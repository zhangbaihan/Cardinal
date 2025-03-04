'use client';

import { useEffect, useState, ReactNode } from 'react';
import { Amplify, Hub } from 'aws-amplify';
import { awsConfig } from '@/lib/config/aws-config';

interface AmplifyProviderProps {
  children: ReactNode;
}

export default function AmplifyProvider({ children }: AmplifyProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    // Initialize Amplify
    Amplify.configure(awsConfig);
    
    // Setup auth listener
    const authListener = Hub.listen('auth', ({ payload }) => {
      const { event } = payload;
      
      switch (event) {
        case 'signIn':
          console.log('User has signed in');
          break;
        case 'signOut':
          console.log('User has signed out');
          break;
        case 'signIn_failure':
          console.log('User sign in failed');
          break;
        default:
          break;
      }
    });
    
    setIsInitialized(true);
    
    // Cleanup listener on unmount
    return () => {
      authListener();
    };
  }, []);
  
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Initializing app...</p>
      </div>
    );
  }
  
  return <>{children}</>;
} 