'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAppState } from '@/providers/app-state-provider';

type ContentResponse = {
  titles: string[];
  description: string;
  callToActions?: string[];
};

export function ContentGenerator() {
  const { saveContent } = useAppState();
  const [topic, setTopic] = useState('How to build an AI-powered video content engine');
  const [keywords, setKeywords] = useState('AI automation, YouTube workflow, creator economy');
  const [titles, setTitles] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [callToActions, setCallToActions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsGenerating(true);
      setError(null);
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, keywords }),
      });
      if (!response.ok) {
        throw new Error('Unable to generate copy right now.');
      }
      const payload = (await response.json()) as ContentResponse;
      setTitles(payload.titles);
      setDescription(payload.description);
      setCallToActions(payload.callToActions ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = (title: string) => {
    if (!title || !description) return;
    saveContent({ topic, title, description });
  };

  return (
    <Card className="border-white/10 bg-white/[0.03] p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl">Title & Description Generator</h2>
          <p className="text-sm text-slate-400">
            Backed by GPT-5 text models. Generate multiple angles, then tailor the description with optimized CTAs.
          </p>
        </div>
        <form onSubmit={handleGenerate} className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-slate-300" htmlFor="topic">
              Video topic or idea
            </label>
            <Textarea
              id="topic"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              rows={5}
              placeholder="What is your video about?"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300" htmlFor="keywords">
              Target keywords & tone
            </label>
            <Textarea
              id="keywords"
              value={keywords}
              onChange={(event) => setKeywords(event.target.value)}
              rows={5}
              placeholder="List important keywords, tone, or hooks to emphasize."
            />
          </div>
          <div className="md:col-span-2 flex items-center justify-between">
            {error ? <p className="text-sm text-red-400">{error}</p> : <span className="text-xs text-slate-500">Tip: Combine data-backed keywords with emotional hooks for the best results.</span>}
            <Button type="submit" disabled={isGenerating}>
              {isGenerating ? 'Thinking…' : 'Generate content'}
            </Button>
          </div>
        </form>
        {titles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <h3 className="text-lg">Suggested Titles</h3>
              <div className="space-y-3 text-sm text-slate-200">
                {titles.map((title) => (
                  <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p>{title}</p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => navigator.clipboard.writeText(title)}>
                        Copy title
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleSave(title)}>
                        Save combo
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <h3 className="text-lg">Description Draft</h3>
              <Textarea value={description} readOnly rows={12} className="min-h-[300px]" />
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => navigator.clipboard.writeText(description)}>
                  Copy description
                </Button>
              </div>
              {callToActions.length > 0 ? (
                <div className="space-y-2">
                  <h4 className="text-sm text-slate-300">Suggested CTAs</h4>
                  <ul className="space-y-2 text-xs text-slate-400">
                    {callToActions.map((cta) => (
                      <li key={cta} className="rounded-lg border border-white/5 bg-white/5 px-3 py-2">
                        {cta}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
