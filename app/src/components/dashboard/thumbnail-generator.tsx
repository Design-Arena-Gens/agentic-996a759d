'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAppState } from '@/providers/app-state-provider';

type GenerateResponse = {
  imageBase64: string;
  provider: string;
};

const defaultPrompt = 'High-energy thumbnail for a YouTube video about mastering AI automation workflows';

export function ThumbnailGenerator() {
  const { saveThumbnail } = useAppState();
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [imageData, setImageData] = useState<string | null>(null);
  const [provider, setProvider] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      const response = await fetch('/api/thumbnail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) {
        throw new Error('Unable to generate thumbnail right now.');
      }
      const data = (await response.json()) as GenerateResponse;
      setImageData(data.imageBase64);
      setProvider(data.provider);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!imageData) return;
    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'creator-command-thumbnail.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = () => {
    if (!imageData) return;
    saveThumbnail({ prompt, imageData });
  };

  return (
    <Card className="border-white/10 bg-white/[0.03] p-6">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl">AI Thumbnail Generator</h2>
            <p className="text-sm text-slate-400">Powered by Gemini 2.5 Flash Image + fallback providers for instant results.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300" htmlFor="thumbnail-prompt">
              Prompt
            </label>
            <Input
              id="thumbnail-prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Describe the energy, style, and focus of your thumbnail"
            />
          </div>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? 'Generating…' : imageData ? 'Regenerate' : 'Generate thumbnail'}
            </Button>
            <Button onClick={handleSave} variant="secondary" disabled={!imageData}>
              Save to dashboard
            </Button>
            <Button onClick={handleDownload} variant="outline" disabled={!imageData}>
              Download PNG
            </Button>
          </div>
          {provider ? <p className="text-xs text-slate-500">Generated via {provider}</p> : null}
        </div>
        <div className="relative flex w-full max-w-lg flex-col items-center justify-center">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
            {imageData ? (
              <Image
                src={imageData}
                alt="Generated thumbnail preview"
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-400">
                Your AI-generated thumbnail will appear here.
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-900/30 via-transparent to-slate-900/40" />
          </div>
        </div>
      </div>
    </Card>
  );
}
