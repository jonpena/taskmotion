import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { UserProps } from "../interfaces/user.interface";

const userSchema: z.ZodType<UserProps> = z.object({
  name: z.string(),
  email: z.string().email(),
  lists: z.string().array(),
} );

export const zUserValidator = zValidator("json", userSchema);
