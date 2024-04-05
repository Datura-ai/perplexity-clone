import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const perplexity = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  baseURL: process.env.NEXT_PUBLIC_PPLX_API_URL,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await perplexity.chat.completions.create({
    model: 'pplx-7b-online',
    stream: true,
    max_tokens: 1000,
    messages: [{ role: 'user', content: prompt }],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
