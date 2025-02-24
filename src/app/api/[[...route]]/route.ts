
import { Hono } from "hono";
import { handle } from "hono/vercel";
import users from "./users";
import sample from "./sample";
import assets from "./assets";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");
const sampleRoute = app.route("/sample", sample);

const usersRoute = app.route("/users", users);
const assetsRoute = app.route("/assets", assets);

export type AppType = typeof sampleRoute | typeof assetsRoute | typeof usersRoute;

const handlers = handle(app);

export { handlers as GET, handlers as POST, handlers as PUT, handlers as DELETE, handlers as PATCH };
