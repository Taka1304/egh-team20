import { Hono } from "hono";
import { handle } from "hono/vercel";
import assets from "./assets";

import badges from "./badges";
import interests from "./interests";
import notifications from "./notifications";
import reactions from "./reactions";
import reports from "./reports";
import sample from "./sample";
import users from "./users";

export const runtime = "nodejs";

const app = new Hono()
  .basePath("/api")
  .route("/assets", assets)
  .route("/badges", badges)
  .route("/sample", sample)
  .route("/interests", interests)
  .route("/notifications", notifications)
  .route("/reports", reports)
  .route("/reactions", reactions)
  .route("/users", users);

export type HonoAppType = typeof app;

const handlers = handle(app);

export { handlers as GET, handlers as POST, handlers as PUT, handlers as DELETE, handlers as PATCH };
