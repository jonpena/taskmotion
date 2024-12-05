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
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `creame una descripcion de la tarea a realizar: ${c.req.query(
    'task'
  )} que sea una descripcion clara, concisa, resumida.`;
  const result = await model.generateContent(prompt);
  return c.json({ result });
});
