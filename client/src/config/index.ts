import { z } from 'zod';

export const envSchema = z.object({
  VITE_APP_SUPABASE_URL: z.string().url(),
  VITE_APP_SUPABASE_ANON_KEY: z.string(),
  VITE_GITHUB_API_URL: z.string().url(),
  VITE_TASKMOTION_API_PROD: z.string().url(),
  VITE_TASKMOTION_API_DEV: z.string().url(),
});

const { success, error, data } = envSchema.safeParse(import.meta.env);

if (!success) {
  console.error(error.message);
  throw new Error('Invalid environment variables');
}

export const {
  VITE_APP_SUPABASE_ANON_KEY: SUPABASE_ANON_KEY,
  VITE_APP_SUPABASE_URL: SUPABASE_URL,
  VITE_GITHUB_API_URL: GITHUB_API_URL,
  VITE_TASKMOTION_API_PROD: TASKMOTION_API_PROD,
  VITE_TASKMOTION_API_DEV: TASKMOTION_API_DEV,
} = data;
