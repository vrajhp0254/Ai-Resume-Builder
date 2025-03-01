import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
  try {
    const { jobTitle, experience } = await req.json();

    const prompt = `For the job title "${jobTitle}" and experience "${experience}", suggest:
    5 technical skills and 3 soft skills that would be valuable.
    Return only the following JSON structure without any markdown formatting:
    {
      "technicalSkills": [
        {"name": "skill1"},
        {"name": "skill2"}
      ],
      "softSkills": [
        {"name": "skill1"},
        {"name": "skill2"}
      ]
    }`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    
    // Clean the response to ensure it's valid JSON
    const cleanResponse = response.replace(/```json|```/g, '').trim();
    
    try {
      const skills = JSON.parse(cleanResponse);
      return NextResponse.json(skills);
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      // Fallback default skills if parsing fails
      return NextResponse.json({
        technicalSkills: [
          { name: "Programming" },
          { name: "Data Analysis" },
          { name: "Project Management" },
        ],
        softSkills: [
          { name: "Communication" },
          { name: "Leadership" },
        ]
      });
    }
  } catch (err) {
    console.error("Error suggesting skills:", err);
    return NextResponse.json(
      { error: "Failed to suggest skills" },
      { status: 500 }
    );
  }
} 