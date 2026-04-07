// app/layout.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import ConditionalNav from '@/components/ConditionalNav';

export const metadata: Metadata = {
  title: 'Safi Hirah Coaching',
  description: 'Mindset and success coaching for women entrepreneurs.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VYKFHX7X11"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VYKFHX7X11');
          `}
        </Script>
        <ConditionalNav />
        <div id="root">{children}</div>
      </body>
    </html>
  );
}