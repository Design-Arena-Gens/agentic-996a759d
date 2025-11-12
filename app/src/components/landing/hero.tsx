'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent px-8 py-16 shadow-[0_0_120px_rgba(51,107,255,0.2)]">
      <div className="grid gap-14 md:grid-cols-[1.1fr,0.9fr] md:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-brand-200">
            All-in-one YouTube growth studio
          </div>
          <h1 className="text-balance text-4xl leading-tight md:text-5xl lg:text-6xl">
            Launch better videos faster with AI-native creator workflows.
          </h1>
          <p className="max-w-xl text-slate-300">
            Creator Command Center gives you thumbnail magic, viral title ideas, and optimized video descriptions—powered by
            the latest AI models. Save time, stay on brand, and post with confidence.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/signup">Start free trial</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="#features">Explore features</Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Realtime AI creation
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-brand-400" />
              Seamless YouTube workflow
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-lg">
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <div className="grid h-full grid-cols-[1fr,0.6fr] gap-4 rounded-2xl bg-slate-950/70 p-4">
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Thumbnail Generator</span>
                  <span>Gemini 2.5 Flash</span>
                </div>
                <div className="h-32 rounded-2xl border border-brand-500/40 bg-gradient-to-br from-brand-500/40 via-brand-400/20 to-transparent shadow-glow" />
                <div className="space-y-2 rounded-2xl border border-white/5 bg-white/[0.04] p-3">
                  <div className="text-xs uppercase tracking-wide text-slate-500">Prompt</div>
                  <div className="text-sm text-slate-200">“Create a neon cyberpunk inspired thumbnail for an AI tutorial.”</div>
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-wide text-slate-500">Top Titles</div>
                  <div className="space-y-2 text-sm text-slate-200">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                      “How I built an AI-powered YouTube studio in 48 hours”
                    </div>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2">
                      “Unlock viral thumbnails with Gemini 2.5 & GPT-5 templates”
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200">
                  Performance boost projected: +32%
                </div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-3xl border border-white/5" />
          </div>
          <div className="absolute -left-10 top-10 hidden rotate-[-5deg] rounded-2xl border border-brand-500/30 bg-brand-500/20 px-4 py-3 text-xs text-brand-100 backdrop-blur md:block">
            🚀 1,200+ thumbnails generated this week
          </div>
          <div className="absolute -right-8 bottom-6 hidden rotate-[4deg] rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-xs text-slate-200 backdrop-blur md:block">
            💡 Top title: &ldquo;From 0 to 100K subs in 90 days&rdquo;
          </div>
        </div>
      </div>
    </section>
  );
}
