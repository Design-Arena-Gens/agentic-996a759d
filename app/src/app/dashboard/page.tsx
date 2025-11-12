'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ContentGenerator } from '@/components/dashboard/content-generator';
import { SavedItems } from '@/components/dashboard/saved-items';
import { ThumbnailGenerator } from '@/components/dashboard/thumbnail-generator';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { useAppState } from '@/providers/app-state-provider';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, isHydrated } = useAppState();

  useEffect(() => {
    if (isHydrated && !user) {
      router.replace('/login');
    }
  }, [isHydrated, user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-200">Dashboard</p>
            <h1 className="mt-3 text-3xl">Welcome back, {user.name ?? user.email}</h1>
            <p className="text-sm text-slate-400">
              Generate thumbnails, brainstorm titles, and organize your launch assets in one place.
            </p>
          </div>
          <Button variant="ghost" onClick={() => logout()}>
            Log out
          </Button>
        </div>
        <div className="space-y-8">
          <ThumbnailGenerator />
          <ContentGenerator />
          <SavedItems />
        </div>
      </main>
      <Footer />
    </div>
  );
}
