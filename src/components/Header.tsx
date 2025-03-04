import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-cardinal-red text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Cardinal
        </Link>
        <div>
          <Link 
            href="/login" 
            className="bg-white text-cardinal-red hover:bg-gray-100 font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
} 