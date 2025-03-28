import { GoogleGenerativeAI } from '@google/generative-ai';
import { Context } from 'hono';

export const generateDescription = async (
  c: Context,
  task: string,
  description: string = ''
) => {
  const genAI = new GoogleGenerativeAI(c.env.API_KEY);

  const generationConfig = {
    temperature: 0.2,
    maxOutputTokens: 200,
  };

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig,
  });

  if (description) {
    return await model.generateContent(`
    Toma la siguiente descripción y mejórala haciéndola más clara, concisa y profesional. Usa un lenguaje natural sin símbolos, listas ni enumeraciones. Incorpora emojis de manera sutil para hacerla más visual y atractiva sin que se vea forzada. La descripción es: ${description}.`);
  }

  return await model.generateContent(`
    Dada la siguiente tarea, genera una descripción clara y concisa explicando qué se debe hacer. Usa un tono profesional y directo sin listas, símbolos ni enumeraciones. Incorpora emojis de manera natural para hacerla más visual y atractiva. La tarea es: ${task}.`);
};
