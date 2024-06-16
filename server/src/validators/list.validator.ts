import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { ListProps } from '../interfaces/list.interface';

const listSchema: z.ZodType<ListProps> = z.object({
  name: z.string(),
  listId: z.string(),
  tasks: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      checked: z.boolean(),
    })
  ),
});

export const zListValidator = zValidator('json', listSchema);
