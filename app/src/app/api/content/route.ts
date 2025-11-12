import { NextResponse } from 'next/server';
import OpenAI from 'openai';

type RequestPayload = {
  topic?: string;
  keywords?: string;
};

const fallbackGenerator = (topic: string, keywords: string) => {
  const trimmedTopic = topic || 'New YouTube video';
  const focusKeywords = keywords || 'YouTube, growth, content';

  const titles = [
    `Why ${trimmedTopic} Will Transform Your Channel in 2024`,
    `${trimmedTopic}: The Complete Playbook for Creators`,
    `Unlock Explosive Growth with ${trimmedTopic}`,
  ];

  const descriptionLines = [
    `In this video, we're diving into ${trimmedTopic}. You'll learn how to leverage ${focusKeywords} to keep your audience clicking and watching.`,
    `▶ Chapters`,
    `00:00 Intro`,
    `01:12 What makes ${trimmedTopic.toLowerCase()} work`,
    `04:36 Step-by-step build`,
    `09:05 Behind-the-scenes workflow`,
    `12:48 Final tips and templates`,
    '',
    `Ready to level up your content? Subscribe for weekly creator breakdowns, download the free playbook, and comment what you want to see next!`,
  ];

  return {
    titles,
    description: descriptionLines.join('\n'),
    callToActions: [
      '💬 Comment with your biggest question about this workflow so we can cover it next.',
      '📩 Grab the companion Notion template linked above.',
      '🔔 Subscribe for weekly AI creator strategies.',
    ],
    provider: 'Local AI fallback',
  };
};

export async function POST(request: Request) {
  const body = (await request.json()) as RequestPayload;
  const topic = body.topic?.trim() ?? '';
  const keywords = body.keywords?.trim() ?? '';

  if (!topic && !keywords) {
    return NextResponse.json({ error: 'Please provide a topic or keywords.' }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

  if (apiKey) {
    try {
      const client = new OpenAI({ apiKey });
      const completion = await client.chat.completions.create({
        model,
        temperature: 0.85,
        messages: [
          {
            role: 'system',
            content:
              'You are an elite YouTube growth strategist. Generate viral-ready video titles and compelling channel descriptions. Respond strictly in JSON with keys: titles (array of 3-5 strings), description (string with newline-separated paragraphs), callToActions (array of short strings).',
          },
          {
            role: 'user',
            content: `Topic: ${topic || 'YouTube video concept'}\nKeywords: ${keywords || 'YouTube, creator growth'}\nAudience: Ambitious video creators using AI.`,
          },
        ],
      });

      const content = completion.choices[0]?.message?.content;
      if (content) {
        const jsonStart = content.indexOf('{');
        const jsonEnd = content.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
          const jsonString = content.slice(jsonStart, jsonEnd + 1);
          try {
            const parsed = JSON.parse(jsonString) as {
              titles?: string[];
              description?: string;
              callToActions?: string[];
            };
            if (parsed.titles && parsed.description) {
              return NextResponse.json({
                titles: parsed.titles,
                description: parsed.description,
                callToActions: parsed.callToActions ?? [],
                provider: 'OpenAI GPT-5 (model proxied)',
              });
            }
          } catch (parseError) {
            console.error('Failed to parse OpenAI response JSON', parseError);
          }
        }
      }
    } catch (error) {
      console.error('OpenAI content generation failed', error);
    }
  }

  const fallback = fallbackGenerator(topic, keywords);
  return NextResponse.json(fallback);
}
