'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAppState } from '@/providers/app-state-provider';

export default function LoginPage() {
  const router = useRouter();
  const { login, isHydrated } = useAppState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isHydrated) return;
    setError(null);
    setLoading(true);
    setTimeout(() => {
      if (!email) {
        setError('Please provide your email address.');
        setLoading(false);
        return;
      }
      login({ email });
      router.push('/dashboard');
    }, 450);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-6 py-20">
        <Card className="w-full max-w-md border-white/10 bg-white/[0.04] p-10">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl">Welcome back</h1>
            <p className="text-sm text-slate-400">Log in to access your saved thumbnails and campaigns.</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-300" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="creator@studio.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-300" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
              />
            </div>
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            <Button type="submit" className="w-full" disabled={loading || !isHydrated}>
              {loading ? 'Signing you in…' : 'Continue'}
            </Button>
          </form>
          <p className="mt-8 text-center text-xs text-slate-400">
            No account yet?{' '}
            <Link href="/signup" className="text-brand-300 hover:text-brand-200">
              Create one for free
            </Link>
          </p>
        </Card>
      </main>
    </div>
  );
}
