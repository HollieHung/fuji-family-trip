import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ITINERARY } from "./constants";

const LS_KEY = 'gemini_api_key';

export const getApiKey = (): string | null => {
  return localStorage.getItem(LS_KEY) || process.env.API_KEY || null;
};

export const saveApiKey = (key: string) => {
  localStorage.setItem(LS_KEY, key);
};

export const generateGuideResponse = async (userMessage: string): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error("MISSING_API_KEY");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Prepare context from itinerary
  const itineraryContext = ITINERARY.map(day => 
    `Day ${day.date} (${day.title}): ${day.activities.map(a => a.time + " " + a.title).join(", ")}`
  ).join("\n");

  const systemPrompt = `
    你是一位專業、親切的日本旅遊導遊，專門負責一個名為「2025 東京與富士山馬拉松家族之旅」的團隊。
    團隊成員有6人，包含長輩和跑馬拉松的選手。
    
    行程概要:
    ${itineraryContext}

    請用簡短、活潑、有幫助的語氣回答使用者的問題。
    如果是關於推薦食物或景點，請務必具體。
    請使用繁體中文。
    回答長度控制在 200 字以內，適合手機閱讀。
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + "\n\n使用者問題: " + userMessage }] }
      ],
      config: {
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return response.text || "導遊現在有點忙，請稍後再問！";
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};