import { NextRequest, NextResponse } from 'next/server';

const requestCounts = new Map();
const REQUEST_LIMIT = 20;
const TIME_WINDOW = 60 * 1000;

function checkRateLimit(clientId) {
  const now = Date.now();
  const data = requestCounts.get(clientId);

  if (!data || now > data.resetTime) {
    const resetTime = now + TIME_WINDOW;
    requestCounts.set(clientId, { count: 1, resetTime });
    return {
      allowed: true,
      remaining: REQUEST_LIMIT - 1,
      resetIn: TIME_WINDOW,
    };
  }

  if (data.count >= REQUEST_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: data.resetTime - now,
    };
  }

  data.count += 1;

  return {
    allowed: true,
    remaining: REQUEST_LIMIT - data.count,
    resetIn: data.resetTime - now,
  };
}

async function callExternalAI(messages, userMessage) {
  try {
    const payload = {
      messages: [
        ...messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        {
          role: 'user',
          content: userMessage,
        },
      ],
      model: 'dolphinserver:24B',
      template: 'code-advanced',
    };

    const response = await fetch('https://chat.dphn.ai/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.body) {
      throw new Error('No response body');
    }

    let fullContent = '';
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;

        const data = line.slice(6);
        if (data === '[DONE]') break;

        try {
          const obj = JSON.parse(data);
          const delta = obj.choices?.[0]?.delta;
          if (delta?.content) {
            fullContent += delta.content;
          }
        } catch {
          // Skip invalid JSON
        }
      }
    }

    const thinking =
      'Processing your request...\n' +
      'Analyzing the context...\n' +
      'Generating response...\n' +
      'Refining output...';

    return {
      thinking,
      content: fullContent || 'I could not generate a response. Please try again.',
    };
  } catch (error) {
    console.error('[API] Error calling external AI:', error);
    return {
      thinking: 'Error processing request',
      content:
        'Sorry, I encountered an error while processing your request. Please try again.',
    };
  }
}

export async function POST(request) {
  try {
    const clientId =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-client-id') ||
      'anonymous';

    const rateLimit = checkRateLimit(clientId);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Please try again later.',
          remaining: rateLimit.remaining,
          resetIn: rateLimit.resetIn,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { message, messages = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const { thinking, content } = await callExternalAI(messages, message);

    return NextResponse.json(
      {
        content,
        thinking,
        remaining: rateLimit.remaining,
        resetIn: rateLimit.resetIn,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
