/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Initialize express app
const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to get Gemini client lazily, avoiding startup crashes if key is empty
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please configure it in Settings > Secrets.");
    }
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return geminiClient;
}

// 1. API: Generate personalized travel itinerary in structured JSON format
app.post("/api/generate-itinerary", async (req: Request, res: Response): Promise<void> => {
  try {
    const { destination, duration, budget, style } = req.body;
    
    if (!destination || !duration) {
      res.status(400).json({ error: "Destination and duration are required." });
      return;
    }

    const ai = getGeminiClient();
    const prompt = `Create a highly authentic, detailed and culturally rich travel itinerary.
      Destination: ${destination}
      Duration: ${duration} days
      Budget Level: ${budget || "moderate"}
      Travel Theme/Style: ${style || "adventure & sightseeing"}
      
      Provide a captivating introductory travel summary, custom packing suggestions suited for the weather of ${destination} in this styling context, and unique, logistically sounds hourly activities (morning, afternoon, evening) for every day.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert global travel designer who produces inspiring, accurate, and structured travel itineraries packed with authentic local experiences. Do not suggest generic ideas; tailor them specifically to the user's destination, budget, and travel style.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            destination: { type: Type.STRING },
            durationDays: { type: Type.INTEGER },
            budgetLevel: { type: Type.STRING },
            travelStyle: { type: Type.STRING },
            summary: { type: Type.STRING, description: "Elegant, inspiring short summary paragraph of the destination experience" },
            packingSuggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "5 specialized things to pack for this destination based on its location and style"
            },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  theme: { type: Type.STRING, description: "The overarching focus of this day, e.g. Historic Temples & Local Delicacies" },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING, description: "e.g., Morning, 14:00, or Sunset" },
                        title: { type: Type.STRING, description: "Name of the dynamic activity" },
                        description: { type: Type.STRING, description: "Details on what to see, do, or taste" },
                        location: { type: Type.STRING, description: "Exact spot/landmark name" },
                        estimatedCost: { type: Type.STRING, description: "Estimated cost with currency, e.g. $15 USD, Free, or ¥2,000" }
                      },
                      required: ["time", "title", "description"]
                    }
                  }
                },
                required: ["day", "theme", "activities"]
              }
            }
          },
          required: [
            "destination",
            "durationDays",
            "budgetLevel",
            "travelStyle",
            "summary",
            "packingSuggestions",
            "days"
          ]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from the AI model.");
    }

    res.json(JSON.parse(text.trim()));
  } catch (error: any) {
    console.error("Itinerary generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate itinerary. Check if GEMINI_API_KEY is configured." });
  }
});

// 2. API: Dynamic Travel Advisory chatbot agent
app.post("/api/advisor/chat", async (req: Request, res: Response) => {
  try {
    const { messages, currentMessage } = req.body;

    if (!currentMessage) {
      res.status(400).json({ error: "Message content is required." });
      return;
    }

    const ai = getGeminiClient();

    // Construct simple history from previous messages
    const formattedHistory = (messages || []).map((msg: any) => {
      return `${msg.sender === "user" ? "Traveler" : "Assistant"}: ${msg.text}`;
    }).join("\n");

    const completePrompt = `Conversation History:\n${formattedHistory}\n\nTraveler: ${currentMessage}\nAssistant:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: completePrompt,
      config: {
        systemInstruction: "You are a warm, highly knowledgeable, and enthusiastic luxury travel advisor. Help clients with travel questions, recommendations, flight/hotel booking tips, cultural customs, hidden gems, and travel regulations in any spot worldwide. Keep answers concise, helpful, formatted in beautiful clean paragraphs (with occasional markdown bullet points), and focused on authentic experiential advice. Do not mention system paths, file names, or environment details.",
        temperature: 0.8,
      }
    });

    const text = response.text;
    res.json({ text: text || "I didn't catch that, could you please repeat?" });
  } catch (error: any) {
    console.error("Chat advisor error:", error);
    res.status(500).json({ error: error.message || "Failed to communicate with advisor. Check if GEMINI_API_KEY is configured." });
  }
});

// Setup Vite Dev server or Production static serving
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Wanderlust premium server running on http://0.0.0.0:${PORT}`);
  });
}

bootstrap();
