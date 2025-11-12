'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppState } from '@/providers/app-state-provider';
import { Button } from './ui/button';

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#workflow', label: 'Workflow' },
];

export function Navbar() {
  const pathname = usePathname();
  const { user } = useAppState();

  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-500 to-brand-300 font-display text-lg text-white shadow-glow transition-all group-hover:shadow-glow">
            CC
          </span>
          <div className="leading-tight">
            <span className="font-display text-xl">Creator Command</span>
            <span className="block text-sm font-normal text-slate-400">AI Studio</span>
          </div>
        </Link>

        {!isDashboard && (
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {user ? (
            <Button asChild variant="secondary" size="sm">
              <Link href="/dashboard">Open Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
