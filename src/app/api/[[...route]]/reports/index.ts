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
      "query",
      z
        .object({
          type: z.enum(["sameCategory", "following", "own"]).optional(),
          userId: z.string().optional(),
        })
        .default({}),
    ),
    async (c) => {
      const session = await getServerSession(authOptions);
      const getType = c.req.valid("query").type ?? "sameCategory";
      const userId = c.req.valid("query").userId;

      try {
        let followedUserIds: string[] = [];
        let whereGetTypeCondition: object = {};

        // userId が指定されている場合、そのユーザーの投稿のみを取得
        if (userId) {
          whereGetTypeCondition = {
            userId,
            OR: [
              // パブリックな投稿
              { visibility: $Enums.Visibility.PUBLIC },
              // ログインユーザーがそのユーザーをフォローしている場合、FOLLOWERS投稿も表示
              ...(session
                ? [
                    {
                      visibility: $Enums.Visibility.FOLLOWERS,
                      user: {
                        followedBy: {
                          some: {
                            followerId: session.user.id,
                          },
                        },
                      },
                    },
                  ]
                : []),
              // 自分自身の投稿は全て表示 (自分のPRIVATEも含める)
              ...(session && session.user.id === userId ? [{}] : []),
            ],
            // 下書きを除外（ただし自分自身の場合は含める）
            ...(session && session.user.id === userId
              ? {}
              : {
                  visibility: { not: $Enums.Visibility.PRIVATE },
                }),
          };
        } else if (session) {
          // 既存のフィルタリングロジック

          // フォロー中のユーザー取得
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

          // getTypeごとに取得条件を変える
          if (getType === "sameCategory") {
            whereGetTypeCondition = {
              OR: [
                // 全ユーザーのパブリックな投稿
                {
                  visibility: $Enums.Visibility.PUBLIC,
                  user: { isPrivate: false },
                },
                // フォローしているユーザーのPUBLIC投稿
                {
                  visibility: $Enums.Visibility.PUBLIC,
                  userId: { in: followedUserIds },
                },
                // フォローしているユーザーのFOLLOWER限定投稿
                {
                  visibility: $Enums.Visibility.FOLLOWERS,
                  userId: { in: followedUserIds },
                },
                // 自分の投稿（PRIVATE含む全て）
                {
                  userId: session.user.id,
                  visibility: { not: $Enums.Visibility.PRIVATE },
                },
              ],
            };
          } else if (getType === "following") {
            whereGetTypeCondition = {
              OR: [
                // フォローしているユーザーのPUBLIC投稿
                {
                  visibility: $Enums.Visibility.PUBLIC,
                  userId: { in: followedUserIds },
                },
                // フォローしているユーザーのFOLLOWER限定投稿
                {
                  visibility: $Enums.Visibility.FOLLOWERS,
                  userId: { in: followedUserIds },
                },
                // 自分の投稿（PRIVATE含む全て）
                {
                  userId: session.user.id,
                  visibility: { not: $Enums.Visibility.PRIVATE },
                },
              ],
            };
          } else if (getType === "own") {
            // 自分の投稿はすべて表示（PRIVATEも含む）
            whereGetTypeCondition = {
              userId: session.user.id,
              visibility: { not: $Enums.Visibility.PRIVATE },
            };
          }
        } else {
          // ログインしていない場合は全ユーザーのパブリックな投稿のみ表示
          // PRIVATEは除外
          whereGetTypeCondition = {
            visibility: $Enums.Visibility.PUBLIC,
            user: {
              isPrivate: false,
            },
          };
        }

        const reports = await prisma.dailyReport.findMany({
          include: {
            user: {
              select: {
                id: true,
                name: true,
                displayName: true,
                image: true,
              },
            },
            reactions: {
              include: {
                type: true,
                user: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
          where: whereGetTypeCondition,
          orderBy: {
            createdAt: "desc",
          },
          take: 30,
        });

        if (reports.length === 0) {
          return c.json({ reports: [] }, 200); // 空の配列を返す
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
