import { Hono } from "hono";
import { cors } from "hono/cors";


import { appUser } from "./routes/users";
import { appList } from "./routes/lists";

const app = new Hono().basePath("/api");

app.use(cors());

app.route("/users", appUser);

app.route("/lists", appList);

export default app;
