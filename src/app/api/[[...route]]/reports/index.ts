import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { $Enums } from "@prisma/client";
import { Hono } from "hono";
import { getServerSession } from "next-auth";
import { z } from "zod";

const app = new Hono();

app.post(
  "/",
  zValidator(
    "json",
    z.object({
      text: z.string().min(1),
      title: z.string().min(1),
      formatId: z.string().optional(),
      goalId: z.string().optional(),
      // もっと良い書き方ありそう
      visibility: z.enum(Object.values($Enums.Visibility) as [$Enums.Visibility, ...$Enums.Visibility[]]), 
      learningTime: z.number().min(0),
      pomodoroCount: z.number().min(0),
    })
  ),
  async (c) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      return c.json({ error: "ログインしていないユーザーです" }, 401);
    }

    const parsed = c.req.valid("json");

    try {
      const report = await prisma.dailyReport.create({
        data: {
          userId: session.user.id,
          ...parsed,
        }
      });

      return c.json({ report }, 201);
    } catch (_error) {
      return c.json({ error: "レポートの作成に失敗しました" }, 500);
    }
  }
);

export default app;
