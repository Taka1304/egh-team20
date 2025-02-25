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
    }),
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
        },
      });

      return c.json({ report }, 201);
    } catch (_error) {
      return c.json({ error: "日報の作成に失敗しました" }, 500);
    }
  },
);

app.get(
  "/:id",
  zValidator(
    "param",
    z.object({
      id: z.string().cuid(),
    }),
  ),
  async (c) => {
    const reportId = c.req.param("id");

    const session = await getServerSession(authOptions);

    try {
      const report = await prisma.dailyReport.findUniqueOrThrow({
        where: {
          id: reportId,
        },
        include: {
          user: {
            select: {
              id: true,
              displayName: true,
              image: true,
              isPrivate: true,
              followedBy: {
                where: {
                  followerId: session?.user.id,
                },
                take: 1,
              },
            },
          },
          reactions: {
            select: {
              id: true,
              type: true,
              user: {
                select: {
                  id: true,
                  displayName: true,
                  image: true,
                },
              },
            },
          },
        },
      });

      // アクセス権限のチェック
      const isOwner = report.user.id === session?.user.id;
      const isFollower = report.user.followedBy.length > 0;

      if (report.user.isPrivate && !isOwner) {
        return c.json({ error: "このユーザーの日報は非公開です" }, 403);
      }

      switch (report.visibility) {
        case $Enums.Visibility.PRIVATE:
          if (!isOwner) {
            return c.json({ error: "この日報は非公開です" }, 403);
          }
          break;
        case $Enums.Visibility.FOLLOWERS:
          if (!isOwner && !isFollower) {
            return c.json({ error: "この日報はフォロワーのみ閲覧可能です" }, 403);
          }
          break;
      }

      // Validation & followedByをレスポンスから削除
      const reportSchema = z.object({
        id: z.string(),
        text: z.string(),
        title: z.string(),
        formatId: z.string().nullable().optional(),
        goalId: z.string().nullable().optional(),
        visibility: z.enum(Object.values($Enums.Visibility) as [$Enums.Visibility, ...$Enums.Visibility[]]),
        learningTime: z.number(),
        pomodoroCount: z.number(),
        user: z.object({
          id: z.string(),
          displayName: z.string().optional().nullable(),
          image: z.string().nullable(),
          isPrivate: z.boolean(),
        }),
        reactions: z.array(
          z.object({
            id: z.string(),
            type: z.object({
              id: z.string(),
              name: z.string(),
            }),
            user: z.object({
              id: z.string(),
              displayName: z.string().nullable().optional(),
              image: z.string().nullable(),
            }),
          }),
        ),
      });

      const sanitizedReport = reportSchema.parse(report);

      return c.json({ report: sanitizedReport }, 200);
    } catch (error) {
      console.error(error)
      return c.json({ error: "日報の取得に失敗しました" }, 500);
    }
  },
);

export default app;
