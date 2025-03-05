import { Context, Hono } from 'hono';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const aiApp = new Hono();

aiApp.get('/generateDescription', async (c: Context) => {
  if (!c.env.API_KEY) {
    return c.text('API_KEY not found in wrangler.toml', 500);
  }

  // Validar parámetro de tarea
  const taskName = c.req.query('task');
  if (!taskName) {
    return c.json(
      {
        error: 'El parámetro "task" es requerido',
      },
      400
    );
  }

  const genAI = new GoogleGenerativeAI(c.env.API_KEY);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: { temperature: 0.2, maxOutputTokens: 200 },
  });

  const task = c.req.query('task');

  const prompt = `crear descripcion de "${task}". no enumerar, crear parrafos, conciso y que tenga un maximo de 600 caracteres`;
  const result = await model.generateContent(prompt);
  return c.json({ result });
});
