'use client';

import Link from 'next/link';

const footerLinks = [
  { label: 'Blog', href: '#' },
  { label: 'Product roadmap', href: '#' },
  { label: 'Support', href: '#' },
  { label: 'Brand kit', href: '#' },
  { label: 'Status', href: '#' },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-500 to-brand-300 font-display text-lg text-white shadow-glow">
              CC
            </span>
            <div className="leading-tight">
              <span className="font-display text-xl">Creator Command</span>
              <span className="block text-sm font-normal text-slate-400">AI Studio</span>
            </div>
          </div>
          <p className="mt-3 max-w-sm text-sm text-slate-400">
            Accelerating YouTube growth with AI-first workflows. Built for creators, agencies, and media studios.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-slate-300">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} Creator Command Center. All rights reserved.</p>
      </div>
    </footer>
  );
}
