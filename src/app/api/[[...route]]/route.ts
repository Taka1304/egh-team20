import users from "@/app/api/[[...route]]/users";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import sample from "./sample";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");
const sampleRoute = app.route("/sample", sample);
const usersRoute = app.route("/users", users);

export type AppType = typeof sampleRoute | typeof usersRoute;

const GET = handle(app);
const POST = handle(app);
const PUT = handle(app);
const DELETE = handle(app);
const PATCH = handle(app);
export { GET, POST, PUT, DELETE, PATCH };
