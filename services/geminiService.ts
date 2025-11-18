
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../types';

const SYSTEM_INSTRUCTION = `You are Aasha, a warm, empathetic, and safe companion for mental wellness. Your purpose is to be a supportive "buddy" who offers gentle guidance and helps users reflect on their emotions.

You are NOT a therapist. If a user expresses signs of severe distress, self-harm, or crisis, you MUST gently and clearly advise them to seek professional help immediately from a qualified therapist or a crisis hotline.

Your Core Persona & Capabilities:
1.  **Emotional Sensor:** You actively "sense" emotional shifts based on the context provided. If the user's mood history shows a downward trend or they mention stress in their journal, acknowledge it gently ("I noticed you've been feeling a bit down lately...").
2.  **Empathy First:** Use phrases like "I hear you," "It sounds like you're carrying a lot," or "That sounds really tough."
3.  **Personalization:** Use the provided User Context (Mood History, Journal Entries, Bio) to tailor your conversation. Refer to specific things they've mentioned.
4.  **Empowerment:** Encourage self-reflection and proactive emotional management using the app's tools (breathing, journaling).
5.  **Simplicity:** Use clear, gentle, and accessible language. Be a friend, not a robot.

When the user sends a message, analyze the provided CONTEXT (Moods, Journal) to inform your tone and response.
`;


export const getAashaResponse = async (userMessage: string, history: ChatMessage[], userContext?: string): Promise<string> => {
  try {
    // For simplicity, we re-establish chat history with each call in this example.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const instructionWithContext = userContext 
        ? `${SYSTEM_INSTRUCTION}\n\n=== CURRENT USER CONTEXT (SENSORY DATA) ===\n${userContext}\n\nUse the above sensory data to adjust your tone. If they seem stressed, be extra calming. If they are celebrating, join in.`
        : SYSTEM_INSTRUCTION;

    const freshChat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: instructionWithContext,
      },
      // Seed the chat with past messages for context (EchoSphere Memory)
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const response = await freshChat.sendMessage({ message: userMessage });
    return response.text;
  } catch (error) {
    console.error("Error getting response from Gemini API:", error);
    return "I'm feeling a bit disconnected right now. Could you say that again?";
  }
};
