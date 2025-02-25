
import { Hono } from "hono";
import { handle } from "hono/vercel";
import users from "./users";
import sample from "./sample";
import reports from "./reports";
import assets from "./assets";

export const runtime = "nodejs";

const app = new Hono()
  .basePath("/api")
  .route("/assets", assets)
  .route("/sample", sample)
  .route("/reports", reports)
  .route("/users", users)

export type AppType = typeof app;

const handlers = handle(app);

export { handlers as GET, handlers as POST, handlers as PUT, handlers as DELETE, handlers as PATCH };
