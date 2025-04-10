import { recoverFromNotFound } from "@/app/api/[[...route]]/utils";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { CheckReportAccessPermission } from "./utils";

// TODO:
type ReactionType = "HEART" | "FIRE" | "CHECK";

const REACTION_TYPE_MAP: Record<string, ReactionType> = {
  cm7k363aj0001r0ux0ff4361n: "HEART",
  cm7n45ua20000ksuxdbbi597c: "FIRE",
  cm7n45ua40001ksux1x3lbq2m: "CHECK",
};

const app = new Hono()
  .post(
    "/:id/reaction/:typeId",
    zValidator(
      "param",
      z.object({
        id: z.string().cuid(),
        typeId: z.string().cuid(),
      }),
    ),
    async (c) => {
      const session = await getServerSession(authOptions);
      if (!session) {
        return c.json({ error: "ログインしていないユーザーです" }, 401);
      }

      const { id: reportId, typeId } = c.req.param();

      try {
        const result = await CheckReportAccessPermission(reportId, session.user.id, c);

        if (!result.ok) {
          return result;
        }

        const reaction = await prisma.reaction.create({
          data: {
            typeId: typeId,
            userId: session.user.id,
            reportId,
          },
        });

        const { report } = await result.json();

        
        // 自分でリアクションを付けた場合は通知を送信しない
        if (report.user.id === session.user.id) {
          return c.json({ reaction }, 201);
        }
        
        //通知を送信
        await prisma.notification.create({
          data: {
            userId: report.user.id,
            sourceUserId: session.user.id,
            reportId,
            message: `さんが${report.title}に${REACTION_TYPE_MAP[typeId]}を付けました`,
            type: `REACTION_${REACTION_TYPE_MAP[typeId]}`,
          },
        });

        return c.json({ reaction }, 201);
      } catch (error) {
        console.error(error);
        return c.json({ error: "リアクションの付与に失敗しました" }, 500);
      }
    },
  )
  .delete(
    "/:id/reaction/:typeId",
    zValidator(
      "param",
      z.object({
        id: z.string().cuid(),
        typeId: z.string().cuid(),
      }),
    ),
    async (c) => {
      const session = await getServerSession(authOptions);
      if (!session) {
        return c.json({ error: "ログインしていないユーザーです" }, 401);
      }

      const { id: reportId, typeId } = c.req.param();

      try {
        const reaction = await recoverFromNotFound(
          prisma.reaction.delete({
            where: {
              typeId_userId_reportId: {
                typeId,
                reportId,
                userId: session.user.id,
              },
            },
          }),
        );

        if (!reaction) {
          return c.json({ error: "対象のリアクションが見つかりません" }, 404);
        }
        return c.json({ message: "リアクションを削除しました" }, 200);
      } catch (error) {
        console.error(error);
        return c.json({ error: "リアクションの削除に失敗しました" }, 500);
      }
    },
  );

export default app;
