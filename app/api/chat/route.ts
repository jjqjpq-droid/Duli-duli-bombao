import { NextRequest, NextResponse } from "next/server";

// Rate limiting: Store request timestamps per IP
const requestLimits = new Map<string, number[]>();
const RATE_LIMIT = 20; // 20 requests per minute
const TIME_WINDOW = 60 * 1000; // 1 minute in milliseconds

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const timestamps = requestLimits.get(clientIp) || [];

  // Remove timestamps outside the time window
  const validTimestamps = timestamps.filter((ts) => now - ts < TIME_WINDOW);

  if (validTimestamps.length >= RATE_LIMIT) {
    return true;
  }

  // Add current timestamp
  validTimestamps.push(now);
  requestLimits.set(clientIp, validTimestamps);

  return false;
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);

    // Check rate limit
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Maximum 20 requests per minute." },
        { status: 429 }
      );
    }

    const { messages } = await request.json();

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
