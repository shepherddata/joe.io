import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an AI assistant representing a developer. Answer questions about their background, skills, projects, and experience. The developer has:

Skills:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, React Native, and web/mobile development
- Backend: Node.js, Python, PostgreSQL, API Design, database infrastructure, 
- Tools: Git, Docker, AWS, CI/CD

Experience:
- Currently: Developer at PNC Bank
- Currently: Freelance developer working on various projects for clients.

Projects:
1. Full-stack application with React and Node.js using PostgreSQL
2. AI-powered tool for data analysis using Next.js and OpenAI API

Be conversational, helpful, and honest. If asked about something not mentioned, be straightforward that you don't have that information.`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === 'sk_YOUR_NEW_KEY_HERE') {
      console.error('OPENAI_API_KEY not configured in environment');
      return NextResponse.json(
        { 
          error: 'OpenAI API key not configured',
          hint: 'Check your Vercel environment variables at https://vercel.com/dashboard'
        },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      
      if (response.status === 401) {
        return NextResponse.json(
          { 
            error: 'Invalid OpenAI API key',
            hint: 'Your API key may be expired or incorrect. Visit https://vercel.com/dashboard to update it.'
          },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to get AI response',
          details: error.error?.message || 'Unknown error'
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const message = data.choices[0].message.content;

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
