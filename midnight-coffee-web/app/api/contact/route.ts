import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, requestDetails, budget } = body;

    if (!name || !requestDetails || !budget) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const discordPayload = {
      embeds: [
        {
          title: "☕ New Client Inquiry!",
          color: 0x0a0a0c,
          fields: [
            { name: "Client Name", value: name, inline: true },
            { name: "Estimated Budget", value: budget, inline: true },
            { name: "Project Request", value: requestDetails },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
    if (!DISCORD_WEBHOOK_URL) {
      console.error("Missing DISCORD_WEBHOOK_URL environment variable");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    return NextResponse.json(
      { message: "Inquiry received successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Backend Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
