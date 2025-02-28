import { prisma } from "@/lib/prisma";
import { Hono } from "hono";

const app = new Hono().get("/", async (c) => {
  try {
    const data = await prisma.interest.findMany();
    return c.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: "Unknown error" }, 500);
  }
});

app.get("/interests", async (c) => {
  try {
    const interests = await prisma.interest.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return c.json({ interests });
  } catch (error) {
    console.error("興味カテゴリの取得に失敗しました:", error);
    return c.json({ error: "興味カテゴリの取得に失敗しました", details: error as string }, 500);
  }
});

export default app;
