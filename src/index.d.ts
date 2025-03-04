// This file contains TypeScript declarations for modules that don't have type definitions

declare module 'next/font/google' {
  export const Inter: (options: { subsets: string[] }) => { className: string };
}

declare module 'react-chartjs-2' {
  export const Bar: React.FC<any>;
  export const Pie: React.FC<any>;
  export const Line: React.FC<any>;
  export const Doughnut: React.FC<any>;
}

// Declare JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
} 