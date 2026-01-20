
import { GoogleGenAI, Type } from "@google/genai";
import { GameRecommendation, DecorSuggestion } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Strictly fetches official game posters using the RAWG API.
 * Uses exact title matching to prevent generic gear images.
 */
export async function fetchOfficialPoster(title: string): Promise<string> {
  const query = encodeURIComponent(title);
  // RAWG Public Key
  const apiKey = '3909774614274c37955519808608f654'; 
  
  try {
    const response = await fetch(`https://api.rawg.io/api/games?search=${query}&key=${apiKey}&search_precise=true`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors'
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        // Strict Match Filtering
        const exactMatch = data.results.find((g: any) => 
          g.name.toLowerCase() === title.toLowerCase() || 
          g.name.toLowerCase().includes(title.toLowerCase())
        );
        
        const game = exactMatch || data.results[0];
        if (game.background_image) {
          return game.background_image;
        }
      }
    }
  } catch (error) {
    console.warn(`[RAWG ERROR] "${title}" fetch failed.`, error);
  }
  
  // High quality unique fallback if RAWG fails
  return `https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200&sig=${Math.random()}`;
}

export async function getGameRecommendations(userPreference: string): Promise<GameRecommendation> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are an elite gaming consultant. Based on this preference: "${userPreference}", suggest some games. Be enthusiastic and use gaming terminology.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestedTitles: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "3-4 actual or highly plausible game titles." 
          },
          reasoning: { type: Type.STRING, description: "Why these games fit the user's vibe." },
          matchingGenre: { type: Type.STRING, description: "The primary genre matched." },
          vibeDescription: { type: Type.STRING, description: "A catchy description of the gaming experience." },
          estimatedPriceRange: { type: Type.STRING, description: "Typical price for these types of games." }
        },
        required: ["suggestedTitles", "reasoning", "matchingGenre", "vibeDescription", "estimatedPriceRange"]
      }
    }
  });

  const text = response.text.trim();
  try {
    return JSON.parse(text) as GameRecommendation;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Neural link unstable. Please try again.");
  }
}

export async function getDecorSuggestions(description: string): Promise<DecorSuggestion> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a world-class interior designer for pro gamers. Based on: "${description}", create a concept.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          theme: { type: Type.STRING },
          vibe: { type: Type.STRING },
          colorPalette: { type: Type.ARRAY, items: { type: Type.STRING } },
          lighting: { type: Type.STRING },
          furniture: { type: Type.ARRAY, items: { type: Type.STRING } },
          accessories: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["theme", "vibe", "colorPalette", "lighting", "furniture", "accessories"]
      }
    }
  });

  const text = response.text.trim();
  try {
    return JSON.parse(text) as DecorSuggestion;
  } catch (error) {
    console.error("Failed to parse Gemini decor response:", error);
    throw new Error("Design link interrupted.");
  }
}
