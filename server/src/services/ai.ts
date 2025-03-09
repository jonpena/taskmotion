import { GoogleGenerativeAI } from "@google/generative-ai";
import { Context } from "hono";

export const generateDescription = async (c: Context, task: string) => {
  const genAI = new GoogleGenerativeAI(c.env.API_KEY);

  const generationConfig = {
    temperature: 0.2, maxOutputTokens: 200
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig,
  });

  return await model.generateContent(`
    crear descripcion de "${task}". no enumerar, crear 
    parrafos, conciso y que tenga un maximo de 600 caracteres`
  );
}