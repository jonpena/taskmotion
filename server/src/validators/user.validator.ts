import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  lists: z.string().array(),
});

export const zUserValidator = zValidator('json', userSchema);
