import { NextRequest, NextResponse } from "next/server";

// API Key validation
const VALID_API_KEY = "@NGYT777GGG";

// Rate limiting: Store request timestamps per API key
const requestLimits = new Map<string, number[]>();
const RATE_LIMIT = 20; // 20 requests per minute
const TIME_WINDOW = 60 * 1000; // 1 minute in milliseconds

function isRateLimited(apiKey: string): boolean {
  const now = Date.now();
  const timestamps = requestLimits.get(apiKey) || [];

  // Remove timestamps outside the time window
  const validTimestamps = timestamps.filter((ts) => now - ts < TIME_WINDOW);

  if (validTimestamps.length >= RATE_LIMIT) {
    return true;
  }

  // Add current timestamp
  validTimestamps.push(now);
  requestLimits.set(apiKey, validTimestamps);

  return false;
}

export async function POST(request: NextRequest) {
  try {
    const { messages, apiKey } = await request.json();

    // Validate API key
    if (!apiKey || apiKey !== VALID_API_KEY) {
      return NextResponse.json(
        { error: "Invalid API key" },
        { status: 401 }
      );
    }

    // Check rate limit per API key
    if (isRateLimited(apiKey)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Maximum 20 requests per minute." },
        { status: 429 }
      );
    }

    const payload = {
      messages,
      model: "dolphinserver:24B",
      template: "code-advanced",
    };

    const response = await fetch("https://chat.dphn.ai/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from AI service" },
        { status: response.status }
      );
    }

    return response;
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
