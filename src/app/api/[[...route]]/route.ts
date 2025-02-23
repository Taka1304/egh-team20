import { Hono } from "hono"
import { handle } from "hono/vercel"
import sample from "./sample"

export const runtime = "edge"

const app = new Hono().basePath("/api")
const sampleRoute = app.route("/sample", sample)

export type AppType = typeof sampleRoute

const GET = handle(app)
const POST = handle(app)
const PUT = handle(app)
const DELETE = handle(app)
const PATCH = handle(app)
export { GET, POST, PUT, DELETE, PATCH }