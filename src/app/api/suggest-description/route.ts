import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
  try {
    const { jobTitle } = await req.json();

    const prompt = `Create a detailed job description for the position of "${jobTitle}". 
    Include key responsibilities, requirements, and day-to-day activities. 
    Keep it professional and concise, around 3-4 sentences.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    
    return NextResponse.json({ description: response });
  } catch (err) {
    console.error("Error generating description:", err);
    return NextResponse.json(
      { error: "Failed to generate description" },
      { status: 500 }
    );
  }
} 