import { NextRequest, NextResponse } from "next/server";
import { genAI } from "@/lib/gemini";

// Helper to generate content with specific model
async function generateWithModel(modelName: string, prompt: string) {
    const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: `You are a helpful financial assistant for Indian investors. You ONLY answer questions related to finance, investing, taxation, and economics. If a user asks about non-financial topics, politely decline.

**1. Live Market Data & Search:**
   - You have access to **Google Search**. You **MUST** use it to fetch real-time data (stock prices, P/E, RSI, latest news) when asked.
   - **Source Priority:** For fundamental data (P/E, Market Cap, ROE), **PRIORITIZE** data from **NSE India (nseindia.com)** or **Screener.in** to ensure consistency. If these sources are available in search results, use their values over others.
   - Do not say "I don't have live access". Instead, search and provide the latest available data.

**2. Stock Analysis (Fundamentals & Technicals):**
   - Provide key fundamental details (Business model, Sector, P/E context, ROE).
   - Discuss Technical Analysis concepts.

**3. Mutual Fund Recommendations:**
   - You **ARE AUTHORIZED** to provide specific names of popular or highly-rated mutual funds.
   - Base suggestions on long-term consistency.

**4. Format & Style:**
   - **Direct Answers:** For specific data queries (e.g., "What is the P/E of Airtel?", "Current price of Reliance"), provide the answer DIRECTLY and immediately. Do NOT pad the response with generic definitions or fluff to reach a word count.
   - Keep other explanations concise and under 150 words.
   - Use **Markdown**.
   - Do NOT add a standard disclaimer at the end of every response (the UI handles this).`,
        tools: [{ googleSearch: {} } as any],
    });

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            maxOutputTokens: 4000,
        },
    });

    return result.response.text();
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { message, topic } = body;

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // Contextualize the prompt with the topic if provided
        const validTopic = topic && topic !== "General" ? `[Topic: ${topic}] ` : "";
        const fullPrompt = `${validTopic}${message}`;

        try {
            // Primary Attempt: gemini-2.5-flash
            const responseText = await generateWithModel("gemini-2.5-flash", fullPrompt);
            return NextResponse.json({ response: responseText });
        } catch (primaryError) {
            console.warn("gemini-2.5-flash failed, attempting fallback to gemini-1.5-flash", primaryError);

            try {
                // Fallback Attempt: gemini-1.5-flash
                const responseText = await generateWithModel("gemini-1.5-flash", fullPrompt);
                return NextResponse.json({ response: responseText });
            } catch (fallbackError) {
                console.error("Both models failed", fallbackError);
                return NextResponse.json({
                    error: `Service currently unavailable. Details: ${fallbackError instanceof Error ? fallbackError.message : String(fallbackError)}`
                }, { status: 503 });
            }
        }
    } catch (error) {
        console.error("Error processing chat request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
