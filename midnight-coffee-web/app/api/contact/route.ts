import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, requestDetails, budget } = body;

    if (!name || !requestDetails || !budget) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const discordPayload = {
      embeds: [{
        title: "☕ New Client Inquiry!",
        color: 0x0A0A0C, 
        fields: [
          { name: "Client Name", value: name, inline: true },
          { name: "Estimated Budget", value: budget, inline: true },
          { name: "Project Request", value: requestDetails }
        ],
        timestamp: new Date().toISOString()
      }]
    };

    // 3. Fire the data straight to your Discord channel
    // Replace this URL with your actual Discord Webhook URL
    const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1516787179366383718/AVFa37C2LsDjws-oJege1Fmz0TM4G6QQsyiXsVUM8EeYSpAsAIHvFoAj-Zpa8TDVC30Z";
    
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload)
    });

    return NextResponse.json({ message: 'Inquiry received successfully!' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}