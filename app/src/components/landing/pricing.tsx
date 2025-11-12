'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const tiers = [
  {
    name: 'Creator Starter',
    price: '$19',
    description: 'Perfect for rising channels publishing up to 12 videos per month.',
    cta: 'Start for free',
    features: [
      '60 AI thumbnail generations / month',
      'Unlimited title & description ideas',
      'Channel voice preset & brand colors',
      'Export to PNG, JPG, and PSD',
    ],
    highlighted: false,
  },
  {
    name: 'Growth Studio',
    price: '$49',
    description: 'Ideal for creators scaling multiple series and experimenting with Shorts.',
    cta: 'Upgrade now',
    features: [
      '300 AI thumbnail generations / month',
      'AI performance predictions',
      'Team collaboration seats (up to 3)',
      'Automation recipes & Zapier integration',
    ],
    highlighted: true,
  },
  {
    name: 'Agency Lab',
    price: '$129',
    description: 'For agencies and media teams managing multiple channels and clients.',
    cta: 'Talk to sales',
    features: [
      'Unlimited thumbnail generations',
      'Brand kit library & client workspaces',
      'Priority Gemini model access',
      'Dedicated success engineer',
    ],
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="space-y-12">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-200">Pricing</p>
        <h2 className="mt-4 text-3xl md:text-4xl">Flexible plans built for every stage of your channel.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
          Start free with unlimited title previews, then scale into advanced automation and creative controls as your
          channel grows.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={`flex h-full flex-col justify-between border ${tier.highlighted ? 'border-brand-400/50 bg-brand-500/10 shadow-glow' : 'border-white/10 bg-white/[0.04]'}`}
          >
            <div className="space-y-5 px-7 py-8">
              <div>
                <h3 className="text-xl">{tier.name}</h3>
                <p className="mt-2 text-sm text-slate-300">{tier.description}</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-semibold">{tier.price}</span>
                <span className="text-sm text-slate-400">/ month</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-200">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-7 pb-8">
              <Button className="w-full" variant={tier.highlighted ? 'primary' : 'secondary'}>
                {tier.cta}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
