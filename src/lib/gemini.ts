import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("Missing GEMINI_API_KEY environment variable. AI features will not work.");
}

export const genAI = new GoogleGenerativeAI(apiKey || "");
