import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import { AppStateProvider } from '@/providers/app-state-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Creator Command Center',
  description:
    'AI-powered YouTube channel management suite for creators. Generate thumbnails, titles, and descriptions instantly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="font-sans bg-slate-950 text-slate-100 antialiased">
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
