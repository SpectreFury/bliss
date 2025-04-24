"use server";

import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function POST(request: Request) {
  const body = await request.json();

  if (!body) throw new Error("No body providing to the prompt");

  const preText =
    "You are a note talking application, and you will be asked to summarize notes for the user. The notes you are going to be given is in a blocknote editor format so ignore all the uncessary stuff and just give the summary of the text content. The note is going to come after this. \n \n";
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: preText + body.note,
    });

    return NextResponse.json(response.text);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
