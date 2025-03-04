import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import AmplifyProvider from '@/components/AmplifyProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cardinal - Stanford Community Survey',
  description: 'Visualizing the background, interests, and lifestyle of the Stanford community',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AmplifyProvider>
          <Header />
          <main>{children}</main>
        </AmplifyProvider>
      </body>
    </html>
  );
}
