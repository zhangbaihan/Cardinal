'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-cardinal-red text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Cardinal
        </Link>
        
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/dashboard" className="hover:text-white/80 transition-colors duration-300">
                Dashboard
              </Link>
            </li>
            
            {isAuthenticated ? (
              <>
                <li>
                  <Link href="/profile" className="hover:text-white/80 transition-colors duration-300">
                    Profile
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="bg-white text-cardinal-red px-4 py-2 rounded hover:bg-gray-100 transition-colors duration-300"
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link 
                  href="/login"
                  className="bg-white text-cardinal-red px-4 py-2 rounded hover:bg-gray-100 transition-colors duration-300"
                >
                  Log In
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
} 