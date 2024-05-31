import { Hono } from "hono";
import { zUserValidator } from "../validators/user.validator";
import { getSupabase, supabaseMiddleware } from "../middleware/supabase";

export const appUser = new Hono();

appUser.use("*", supabaseMiddleware);

appUser.get("/", async (c) => {
  const supabase = getSupabase(c);
  const { data, error } = await supabase.from("users").select("*");
  return c.json({ data, error });
});

appUser.post("/", zUserValidator, async (c) => {
  const body = await c.req.json();

  const { data, error } = await getSupabase(c)
    .from("users")
    .insert(body)
    .select();

  return c.json({ data, error });
});
