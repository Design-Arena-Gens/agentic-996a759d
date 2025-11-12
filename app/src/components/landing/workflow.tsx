'use client';

import { Card } from '@/components/ui/card';

const steps = [
  {
    title: '1. Define your video focus',
    description:
      'Drop in your raw idea, target keywords, or a draft script. Our prompt assistant helps shape the brief for the AI models.',
  },
  {
    title: '2. Spin up thumbnails and messaging',
    description:
      'Preview multiple thumbnail directions, title angles, and description outlines instantly. Refine tone, colors, and CTA with quick toggles.',
  },
  {
    title: '3. Launch with confidence',
    description:
      'Lock in the winning combo, export assets, and sync to your content calendar. Save everything to your dashboard for future iterations.',
  },
];

export function WorkflowSection() {
  return (
    <section id="workflow" className="space-y-12">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-200">Workflow</p>
        <h2 className="mt-4 text-3xl md:text-4xl">From idea to publish-ready in three steps.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
          No more context switching across tools. Creator Command Center condenses your creative process into a single,
          repeatable flow.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <Card key={step.title} className="border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl">{step.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{step.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
