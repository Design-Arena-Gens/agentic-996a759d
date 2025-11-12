'use client';

import Image from 'next/image';
import { Fragment } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAppState } from '@/providers/app-state-provider';

export function SavedItems() {
  const { thumbnails, contents, removeContent, removeThumbnail } = useAppState();

  const hasContent = contents.length > 0;
  const hasThumbnails = thumbnails.length > 0;

  if (!hasContent && !hasThumbnails) {
    return (
      <Card className="border-white/10 bg-white/[0.02] p-10 text-center text-slate-400">
        <p>You haven&apos;t saved anything yet. Generate thumbnails or copy to see them here.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {hasThumbnails ? (
        <Card className="border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg">Saved Thumbnails</h3>
            <span className="text-xs text-slate-500">{thumbnails.length} saved</span>
          </div>
          <div className="mt-4 space-y-4">
            {thumbnails.map((thumb) => (
              <div
                key={thumb.id}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:flex-row md:items-center"
              >
                <div className="relative h-32 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900 md:w-52">
                  <Image
                    src={thumb.imageData}
                    alt="Saved thumbnail"
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 208px"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <p className="text-xs text-slate-400">Prompt</p>
                  <p className="text-sm text-slate-200">{thumb.prompt}</p>
                  <div className="text-xs text-slate-500">{new Date(thumb.createdAt).toLocaleString()}</div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => navigator.clipboard.writeText(thumb.prompt)}
                    >
                      Copy prompt
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => removeThumbnail(thumb.id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {hasContent ? (
        <Card className="border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg">Saved Titles & Descriptions</h3>
            <span className="text-xs text-slate-500">{contents.length} saved</span>
          </div>
          <div className="mt-4 space-y-4">
            {contents.map((item) => (
              <Fragment key={item.id}>
                <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">Title</p>
                    <p className="text-sm text-slate-100">{item.title}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">Description</p>
                    <p className="whitespace-pre-wrap text-sm text-slate-200">{item.description}</p>
                  </div>
                  <div className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleString()}</div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => navigator.clipboard.writeText(item.title)}
                    >
                      Copy title
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => navigator.clipboard.writeText(item.description)}
                    >
                      Copy description
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => removeContent(item.id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
