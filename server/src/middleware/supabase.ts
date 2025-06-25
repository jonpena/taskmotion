import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { Context, MiddlewareHandler } from 'hono';

export const idCtxSupabase = 'supabase-ctx';

export const supabaseMiddleware: MiddlewareHandler = async (c, next) => {
  try {
    if (!c.env.SUPABASE_URL || !c.env.SUPABASE_KEY) {
      return c.text('variable SUPABASE_URL or SUPABASE_KEY not found in wrangler.toml', 500);
    }
    const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_KEY);
    c.set(idCtxSupabase, supabase);
    await next();
  } catch (error) {
    return c.text('Error connecting to Supabase', 500);
  }
};

export const getSupabase = (c: Context): SupabaseClient => c.get(idCtxSupabase);
