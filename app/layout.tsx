// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import ConditionalNav from '@/components/ConditionalNav';

export const metadata: Metadata = {
  title: 'Safirah Coaching',
  description: 'Mindset and success coaching for women entrepreneurs.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ConditionalNav />
    <div className='pt-10'></div>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}