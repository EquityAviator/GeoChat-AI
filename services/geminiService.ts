import { GoogleGenAI } from "@google/genai";
import type { GroundingChunk, Source } from '../types';

if (!process.env.API_KEY) {
  // This will be handled by the environment, but it's good practice.
  console.warn("API_KEY environment variable not found. The application might not work as expected.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const MAPS_KEYWORDS = [
  'where is', 'restaurants', 'cafes', 'bars', 'hotels', 'directions to',
  'near me', 'nearby', 'location of', 'find a', 'map of', 'how to get to'
];

const containsMapKeyword = (prompt: string): boolean => {
  const lowercasedPrompt = prompt.toLowerCase();
  return MAPS_KEYWORDS.some(keyword => lowercasedPrompt.includes(keyword));
};

export const getGroundedResponse = async (
  prompt: string,
  location: { latitude: number; longitude: number } | null
): Promise<{ text: string; sources: Source[]; isMap: boolean }> => {
  try {
    const useMaps = containsMapKeyword(prompt) && location;
    
    let config: any = {
        tools: [{ googleSearch: {} }],
    };
    if (useMaps) {
        config = {
            tools: [{ googleMaps: {} }],
            toolConfig: {
              retrievalConfig: {
                latLng: {
                  // FIX: Use `useMaps` which is guaranteed to be the location object here, preventing potential null reference issues with `location`.
                  latitude: useMaps.latitude,
                  longitude: useMaps.longitude
                }
              }
            }
        };
    }

    const modelParams = {
        model: "gemini-2.5-flash",
        contents: prompt,
        config
    };

    const genAIResponse = await ai.models.generateContent(modelParams);

    const text = genAIResponse.text;
    const groundingMetadata = genAIResponse.candidates?.[0]?.groundingMetadata;
    const groundingChunks: GroundingChunk[] = groundingMetadata?.groundingChunks || [];

    const sources: Source[] = groundingChunks.map(chunk => {
      if (chunk.web) {
        return { uri: chunk.web.uri, title: chunk.web.title, type: 'web' as const };
      }
      if (chunk.maps) {
        return { uri: chunk.maps.uri, title: chunk.maps.title, type: 'maps' as const };
      }
      return null;
    }).filter((source): source is Source => source !== null);

    // FIX: The value for `isMap` must be a boolean. The `useMaps` variable can be an object or a falsy value, so it is coerced to a boolean.
    return { text, sources, isMap: !!useMaps };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return { text: `An error occurred while contacting the AI model: ${error.message}. Please check your connection and API key.`, sources: [], isMap: false };
    }
    return { text: "An unknown error occurred.", sources: [], isMap: false };
  }
};
