import { env } from "@/lib/env";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { type Context, Hono } from "hono";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

const app = new Hono().get("/:reportId", (c) => run(c));
export default app;

async function run(c: Context) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = "初めまして，egh-team20と申します";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return c.json({ text });
}
