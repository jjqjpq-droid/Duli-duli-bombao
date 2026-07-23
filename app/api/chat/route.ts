import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
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
