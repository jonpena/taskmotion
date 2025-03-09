import { Context, Hono } from 'hono';
import { generateDescription } from '@server/services/ai';

export const aiApp = new Hono();

aiApp.get('/generateDescription', async (c: Context) => {
  if (!c.env.API_KEY) {
    return c.text('API_KEY not found in wrangler.toml', 500);
  }

  const taskName = c.req.query('task');

  if (!taskName) {
    return c.json(
      {
        error: 'El parámetro "task" es requerido',
      },
      400
    );
  }
  const task = c.req.query('task') as string;
  const result = await generateDescription(c, task);
  return c.json({ result });
});
