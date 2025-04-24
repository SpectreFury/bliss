import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const pretext =
      "You are being used inside a note taking application where you're supposed to summarize the notes user gives to you. The note will be given a block note format. Do not give any response about the format or structure and content, only summarize the actual content without any filter sentences. Only give the summary of the text given from now on. \n \n";

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: pretext + data.note,
    });

    return NextResponse.json(response.text);
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { error: error.message || "Internal error" },
      { status: 500 }
    );
  }
}
