'use client';

import { CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

const featureCards = [
  {
    title: 'AI Thumbnail Studio',
    description:
      'Enter your creative intent and watch Gemini 2.5 Flash craft scroll-stopping thumbnails, optimized for YouTube and Shorts.',
    bullets: ['Prompt refinement suggestions', 'Multiple aspect ratios', 'One-click download'],
  },
  {
    title: 'Viral Title Architect',
    description:
      'Transform a raw video idea into multiple high-converting title options tuned for CTR and SEO-friendly keywords.',
    bullets: ['Tone presets and A/B buckets', 'CTR score predictions', 'Competitor keyword insights'],
  },
  {
    title: 'Description Composer',
    description:
      'Generate rich descriptions, timestamps, and call-to-actions powered by GPT-5 agents that understand your channel voice.',
    bullets: ['Channel persona memory', 'Auto hashtag recommendations', 'Sponsor integration blocks'],
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="space-y-12">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-200">Creator workflows</p>
        <h2 className="mt-4 text-3xl md:text-4xl">Everything you need to ship your next viral video.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
          Build a publishing cadence with less manual work. Creator Command Center centralizes ideation, production, and
          optimization in one cohesive dashboard.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {featureCards.map((feature) => (
          <Card key={feature.title} className="group flex h-full flex-col gap-4 border-white/5 bg-white/[0.04] p-6">
            <div className="text-sm uppercase tracking-[0.2em] text-brand-200">Feature</div>
            <h3 className="text-2xl">{feature.title}</h3>
            <p className="text-sm text-slate-300">{feature.description}</p>
            <ul className="mt-4 space-y-2">
              {feature.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}
