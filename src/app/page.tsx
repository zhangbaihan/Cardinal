import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full relative">
        <Image
          src="/stanford_colonnade.jpg"
          alt="Stanford Colonnade"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-xl mb-8">
          Inspired by the Harvard Crimson&apos;s annual <a href="https://features.thecrimson.com/2023/freshman-survey/" target="_blank" rel="noopener noreferrer" className="text-cardinal-red hover:text-cardinal-dark underline">freshman class survey</a>, Cardinal uses interactive graphs and charts to visualize the background, interests, and lifestyle of the Stanford community.
        </p>
        
        <Link 
          href="/register" 
          className="bg-cardinal-red hover:bg-cardinal-dark text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
