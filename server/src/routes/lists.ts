import { Hono } from "hono";
import { zUserValidator } from "../validators/user.validator";
import { getSupabase, supabaseMiddleware } from "../middleware/supabase";
import { zListValidator } from "../validators/list.validator";
import { UserProps } from "../interfaces/user.interface";

export const appList = new Hono();

appList.use("*", supabaseMiddleware);

appList.get("/", async (c) => {
  const supabase = getSupabase(c);
  const { data, error } = await supabase.from("lists").select("*");
  return c.json({ data, error });
});

// Get all lists from the database for the user

appList.get("/:email", async (c) => {

  const supabase = getSupabase(c);

  const email = c.req.param("email");  

  const users = await supabase.from("users").select(`*`).eq(`email`, `${email}`);

  const user = users.data?.[0] as UserProps;

  if (!user) {
    return c.json({ error: "User does not exist" });
  }

  const lists = JSON.parse(user.lists.toString());
  
  const { data, error } = await supabase.from("lists").select("*").in("listId", lists);

  return c.json({ data, error });
});

// Create a new list
appList.post("/", zListValidator, async (c) => {
  const body = await c.req.json();

  const { data, error } = await getSupabase(c)
    .from("lists")
    .insert(body)
    .select();

  return c.json({ data, error });
});
