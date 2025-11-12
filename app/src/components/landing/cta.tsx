'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="rounded-3xl border border-brand-500/30 bg-gradient-to-br from-brand-500/20 via-brand-500/10 to-transparent px-10 py-14 text-center shadow-glow">
      <h2 className="text-balance text-3xl md:text-4xl">Upgrade your channel ops with AI-native tooling.</h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-200">
        Join thousands of creators optimizing every upload with Creator Command Center. Start with the free tier—no credit
        card required.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/signup">Claim your free workspace</Link>
        </Button>
        <Button asChild variant="secondary" size="lg">
          <Link href="/login">I already have an account</Link>
        </Button>
      </div>
    </section>
  );
}
