import { prisma } from "@/lib/prisma";
import { Hono } from "hono";

const app = new Hono()
// GetBadgeList
.get("/", async (c) => {
  try {
    const data = await prisma.badge.findMany();
    return c.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: "Unknown error" }, 500);
  }
})

export default app;
