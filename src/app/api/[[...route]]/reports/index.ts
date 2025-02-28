import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { $Enums } from "@prisma/client";
import { Hono } from "hono";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { recoverFromNotFound } from "../utils";
import reaction from "./reaction";
import { CheckReportAccessPermission } from "./utils";

const app = new Hono()
  .route("/", reaction)
  .get(
    "/",
    zValidator(
      "param",
      z.object({
        type: z.enum(["sameCategory", "following", "own"]).default("sameCategory"),
      }),
    ),
    async (c) => {
      const session = await getServerSession(authOptions);
      const getType = c.req.param("type");

      try {
        let followedUserIds: string[] = [];
        let whereCondition: object = {};

        if (session) {
          followedUserIds = await prisma.follow
            .findMany({
              where: {
                followerId: session.user.id,
              },
              select: {
                followingId: true,
              },
            })
            .then((follows) => follows.map((follow) => follow.followingId));
          if (getType === "sameCategory") {
            whereCondition = {
              OR: [
                // 全ユーザーのパブリックな投稿
                { visibility: $Enums.Visibility.PUBLIC, user: { isPrivate: false } },
                // フォローしているユーザーの投稿
                {
                  visibility: $Enums.Visibility.FOLLOWERS,
                  user: { isPrivate: false },
                  userId: { in: followedUserIds },
                },
                // 自分の投稿
                { userId: session.user.id },
              ],
            };
          } else if (getType === "following") {
            whereCondition = {
              visibility: $Enums.Visibility.FOLLOWERS,
              user: { isPrivate: false },
              userId: { in: followedUserIds },
            };
          } else if (getType === "own") {
            whereCondition = {
              userId: session.user.id,
            };
          }
        }
        const reports = await prisma.dailyReport.findMany({
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                image: true,
                isPrivate: true,
              },
            },
            reactions: {
              select: {
                type: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
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
          where: !session
            ? {
                visibility: $Enums.Visibility.PUBLIC,
                user: {
                  isPrivate: false,
                },
              }
            : whereCondition,
          orderBy: {
            createdAt: "desc",
          },
          take: 30,
        });

        if (reports.length === 0) {
          return c.json({ error: "日報が見つかりません" }, 404);
        }

        return c.json({ reports }, 200);
      } catch (error) {
        console.error(error);
        return c.json({ error: "日報の取得に失敗しました" }, 500);
      }
    },
  )
  .get("/drafts", async (c) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      return c.json({ error: "ログインしていないユーザーです" }, 401);
    }

    try {
      const reports = await prisma.dailyReport.findMany({
        where: {
          userId: session.user.id,
          visibility: $Enums.Visibility.PRIVATE,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (reports.length === 0) {
        return c.json({ error: "下書きが見つかりません" }, 404);
      }
      return c.json({ reports }, 200);
    } catch (error) {
      console.error(error);
      return c.json({ error: "下書きの取得に失敗しました" }, 500);
    }
  })
  .post(
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
      } catch (error) {
        console.error(error);
        return c.json({ error: "日報の作成に失敗しました" }, 500);
      }
    },
  )
  .get(
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
        const result = await CheckReportAccessPermission(reportId, session?.user.id, c);
        if (result._status !== 200) {
          return result;
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

        const sanitizedReport = reportSchema.parse(result._data.report);

        return c.json({ report: sanitizedReport }, 200);
      } catch (error) {
        console.error(error);
        return c.json({ error: "日報の取得に失敗しました" }, 500);
      }
    },
  )
  .put(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().cuid(),
      }),
    ),
    zValidator(
      "json",
      z.object({
        text: z.string().min(1),
        title: z.string().min(1),
        formatId: z.string().optional(),
        goalId: z.string().optional(),
        visibility: z.enum(Object.values($Enums.Visibility) as [$Enums.Visibility, ...$Enums.Visibility[]]),
        learningTime: z.number().min(0),
        pomodoroCount: z.number().min(0),
      }),
    ),
    async (c) => {
      const reportId = c.req.param("id");
      const session = await getServerSession(authOptions);

      if (!session) {
        return c.json({ error: "ログインしていないユーザーです" }, 401);
      }

      const parsed = c.req.valid("json");

      try {
        const report = await recoverFromNotFound(
          prisma.dailyReport.update({
            where: {
              id: reportId,
              userId: session.user.id,
            },
            data: {
              ...parsed,
            },
          }),
        );

        if (!report) {
          return c.json({ error: "対象の日報が見つかりません" }, 404);
        }

        return c.json({ report }, 200);
      } catch (error) {
        console.error(error);
        return c.json({ error: "日報の更新に失敗しました" }, 500);
      }
    },
  )
  .delete(
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

      if (!session) {
        return c.json({ error: "ログインしていないユーザーです" }, 401);
      }

      try {
        const report = await recoverFromNotFound(
          prisma.dailyReport.delete({
            where: {
              id: reportId,
              userId: session.user.id,
            },
          }),
        );

        if (!report) {
          return c.json({ error: "対象の日報が見つかりません" }, 404);
        }

        return c.json({ report }, 200);
      } catch (error) {
        console.error(error);
        return c.json({ error: "日報の削除に失敗しました" }, 500);
      }
    },
  );

export default app;
