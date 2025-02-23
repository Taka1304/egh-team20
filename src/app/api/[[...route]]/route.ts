import { Hono } from "hono"
import { handle } from "hono/vercel"
import sample from "./sample"

export const runtime = "edge"

const app = new Hono().basePath("/api")
const sampleRoute = app.route("/sample", sample)

export type AppType = typeof sampleRoute

export const GET = handle(app)
export const POST = handle(app)