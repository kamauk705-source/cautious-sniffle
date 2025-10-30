
import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Fix: Correct initialization of GoogleGenAI client.
// The API key MUST be obtained exclusively from the environment variable `process.env.API_KEY`.
const ai = new GoogleGenAI({apiKey: process.env.API_KEY!});

let chat: Chat | null = null;

function getChat(): Chat {
    if (!chat) {
        // Fix: Use correct model name 'gemini-2.5-flash' for basic text tasks.
        // Fix: Use ai.chats.create to initialize a chat session.
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            // Fix: Pass systemInstruction in config.
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            },
        });
    }
    return chat;
}

export const startNewChat = () => {
    // This will force getChat to create a new chat session with fresh context.
    chat = null;
};

// This function will handle streaming responses.
export async function* getTutorResponseStream(
    message: string
): AsyncGenerator<string> {
    const chatSession = getChat();
    // Fix: Use chat.sendMessageStream for streaming responses.
    const result = await chatSession.sendMessageStream({ message });

    // Fix: Iterate over the stream and yield the text from each chunk.
    for await (const chunk of result) {
        // Fix: Access the text directly from the chunk.
        const text = chunk.text;
        if (text) {
            yield text;
        }
    }
}
