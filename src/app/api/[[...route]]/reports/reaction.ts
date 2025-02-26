import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { CheckReportAccessPermission } from "./utils";

const app = new Hono();

app.post(
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

      if (result._status !== 200) {
        return result;
      }

      const reaction = await prisma.reaction.create({
        data: {
          typeId: typeId,
          userId: session.user.id,
          reportId,
        },
      });

      return c.json({ reaction }, 201);
    } catch (error) {
      console.error(error);
      return c.json({ error: "リアクションの付与に失敗しました" }, 500);
    }
  },
);

app.delete(
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
      const reaction = await prisma.reaction.deleteMany({
        where: {
          typeId: typeId,
          userId: session.user.id,
          reportId,
        },
      });

      if (reaction.count === 0) {
        return c.json({ error: "リアクションが見つかりません" }, 404);
      }

      return c.json({ message: "リアクションを削除しました" }, 200);
    } catch (error) {
      console.error(error);
      return c.json({ error: "リアクションの削除に失敗しました" }, 500);
    }
  },
);

export default app;
