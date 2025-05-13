import { Context, Hono } from 'hono';
import { generateDescription } from '@server/services/ai';

export const aiApp = new Hono();

aiApp.get('/generateDescription', async (c: Context) => {
  if (!c.env.API_KEY) return c.text('API_KEY not found in wrangler.toml', 500);

  const taskName = c.req.query('task');
  const description = c.req.query('description');

  if (!taskName)
    return c.json(
      {
        error: 'Task name is required',
      },
      400
    );
  const result = await generateDescription(c, taskName, description);
  return c.json({ result });
});
