import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { content, type } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const prompt = type === 'experience' 
      ? `Rewrite the following job activities into 3-4 professional, achievement-oriented bullet points for a resume. Use strong action verbs and include metrics if applicable. Content: ${content}`
      : `Improve the following content for a professional resume: ${content}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://ai-resume-pro.vercel.app', // Placeholder
        'X-Title': 'AI Resume Pro',
      },
      body: JSON.stringify({
        model: 'google/gemini-pro-1.5', // Defaulting to Gemini Pro
        messages: [
          { role: 'system', content: 'You are a professional resume writer and career coach.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await response.json();
    const improvedContent = data.choices[0]?.message?.content || '';

    return NextResponse.json({ improvedContent });
  } catch (error) {
    console.error('AI Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
