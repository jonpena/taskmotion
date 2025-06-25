import { Hono } from 'hono';
import { zUserValidator } from '../validators/user.validator';
import { getSupabase, supabaseMiddleware } from '../middleware/supabase';

export const userApp = new Hono();

userApp.use('*', supabaseMiddleware);

// CREATE A NEW USER
userApp.post('/', zUserValidator, async (c) => {
  const body = await c.req.json();

  const { data, error } = await getSupabase(c).from('users').insert(body).select();

  return c.json({ data, error });
});
