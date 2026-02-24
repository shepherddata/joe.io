import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;

  // Debug info
  const debugInfo = {
    apiKeyExists: !!apiKey,
    apiKeyLength: apiKey ? apiKey.length : 0,
    apiKeyPrefix: apiKey ? apiKey.substring(0, 10) : 'N/A',
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  };

  if (!apiKey || apiKey === 'sk_YOUR_NEW_KEY_HERE') {
    return NextResponse.json({
      status: 'error',
      message: 'OPENAI_API_KEY environment variable is not set',
      debug: debugInfo,
      instructions: [
        '1. Go to https://vercel.com/dashboard',
        '2. Click your project (joe.io)',
        '3. Click Settings → Environment Variables',
        '4. Add OPENAI_API_KEY with your OpenAI secret key',
        '5. Make sure it\'s enabled for Production, Preview, and Development',
        '6. Redeploy: Click Deployments → Select latest → Click "Redeploy"',
      ],
    });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (response.ok) {
      return NextResponse.json({
        status: 'success',
        message: 'OpenAI API key is valid and working!',
        debug: { ...debugInfo, apiKeyExists: true },
      });
    } else if (response.status === 401) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Invalid API key - check that your OpenAI API key is correct',
          debug: debugInfo,
          statusCode: response.status,
        },
        { status: 401 }
      );
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        {
          status: 'error',
          message: `OpenAI API error: ${response.status} ${response.statusText}`,
          debug: debugInfo,
          openaiError: errorData,
        },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        debug: debugInfo,
      },
      { status: 500 }
    );
  }
}
