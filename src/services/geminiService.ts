import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateContent = async (prompt: string, systemInstruction?: string, isJson: boolean = false) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: isJson ? "application/json" : "text/plain",
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};
