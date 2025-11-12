import { NextResponse } from 'next/server';

const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateImage';
const FALLBACK_ENDPOINT = 'https://image.pollinations.ai/prompt/';

type GeminiResponse =
  | {
      generatedImages?: { image?: { base64?: string } }[];
    }
  | {
      candidates?: { content?: { parts?: { inlineData?: { data?: string } }[] } }[];
    }
  | {
      data?: { b64_json?: string }[];
    }
  | Record<string, unknown>;

type RequestPayload = {
  prompt?: string;
};

const parseGeminiImage = (payload: GeminiResponse): string | null => {
  if ('generatedImages' in payload && Array.isArray(payload.generatedImages)) {
    const base64 = payload.generatedImages[0]?.image?.base64;
    if (base64) return base64;
  }
  if ('candidates' in payload && Array.isArray(payload.candidates)) {
    for (const candidate of payload.candidates) {
      const parts = candidate?.content?.parts;
      if (!Array.isArray(parts)) continue;
      const inline = parts.find((part) => part.inlineData?.data);
      if (inline?.inlineData?.data) return inline.inlineData.data;
    }
  }
  if ('data' in payload && Array.isArray(payload.data)) {
    const base64 = payload.data[0]?.b64_json;
    if (base64) return base64;
  }
  return null;
};

const toDataUri = (base64: string, format = 'png') => `data:image/${format};base64,${base64}`;

export async function POST(request: Request) {
  const body = (await request.json()) as RequestPayload;
  const prompt = body.prompt?.trim();

  if (!prompt) {
    return NextResponse.json({ error: 'Missing prompt.' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_GEMINI_API_KEY ?? process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const geminiResponse = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: { text: prompt },
        }),
        cache: 'no-store',
      });

      if (geminiResponse.ok) {
        const payload = (await geminiResponse.json()) as GeminiResponse;
        const base64 = parseGeminiImage(payload);
        if (base64) {
          return NextResponse.json({
            imageBase64: toDataUri(base64),
            provider: 'Gemini 2.5 Flash Image',
          });
        }
      }
    } catch (error) {
      console.error('Gemini image generation failed', error);
    }
  }

  try {
    const fallbackUrl = `${FALLBACK_ENDPOINT}${encodeURIComponent(prompt)}?width=1280&height=720&nologo=true`;
    const fallbackResponse = await fetch(fallbackUrl, {
      headers: { Accept: 'image/png' },
      cache: 'no-store',
    });

    if (!fallbackResponse.ok) {
      throw new Error('Fallback provider unavailable');
    }

    const arrayBuffer = await fallbackResponse.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    return NextResponse.json({
      imageBase64: toDataUri(base64),
      provider: 'Pollinations AI',
    });
  } catch (error) {
    console.error('Fallback thumbnail generation failed', error);
    return NextResponse.json(
      { error: 'Thumbnail generation failed. Please try again later.' },
      { status: 500 },
    );
  }
}
