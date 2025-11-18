
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../types';

const SYSTEM_INSTRUCTION = `You are Aasha, a warm, empathetic, and safe companion for mental wellness. Your purpose is to provide a non-judgmental listening ear, offer gentle guidance, and help users reflect on their emotions. You are designed to support young professionals in India, so maintain a culturally sensitive and understanding tone.

You are not a therapist. If a user expresses signs of severe distress, self-harm, or crisis, you MUST gently and clearly advise them to seek professional help immediately from a qualified therapist or a crisis hotline.

Your core principles are:
1.  **Empathy First:** Always validate the user's feelings. Use phrases like "I hear you," "It sounds like you're carrying a lot," or "That sounds really tough."
2.  **Personalization:** Pay attention to details the user shares and refer back to them gently to show you are listening.
3.  **Safety:** Prioritize user well-being. Do not give medical advice.
4.  **Empowerment:** Encourage self-reflection and proactive emotional management using the tools in the app (breathing, journaling).
5.  **Simplicity:** Use clear, gentle, and accessible language. Avoid robotic or overly formal phrasing. Be a friend.`;


export const getAashaResponse = async (userMessage: string, history: ChatMessage[]): Promise<string> => {
  try {
    // For simplicity, we re-establish chat history with each call in this example.
    // A more sophisticated implementation might manage the chat instance state differently.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const freshChat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
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
