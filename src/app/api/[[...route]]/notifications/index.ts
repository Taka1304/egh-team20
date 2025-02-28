import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { $Enums, NotificationType } from "@prisma/client";
import { Hono } from "hono";
import { getServerSession } from "next-auth";

const app = new Hono()
  .get("/", async (c) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      return c.json({ error: "ログインしていないユーザーです" }, 401);
    }
    const data = await prisma.notification.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        sourceUser: {
          select: {
            id: true,
            displayName: true,
            image: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return c.json(data);
  })
  .post("/:id/read", async (c) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      return c.json({ error: "ログインしていないユーザーです" }, 401);
    }
    const { id } = c.req.param();
    try {

      const data = await prisma.notification.update({
        where: {
          id,
          userId: session.user.id,
        },
        data: {
          isRead: true,
        },
      });
      if (!data) {
        return c.json({ error: "対象の通知がありません" }, 404);
      }

      return c.json(data);
    } catch (e) {
      console.error(e);
      return c.json({ error: "通知の既読化に失敗しました" }, 500);
    }
  });

export type NotificationResponse = {
  sourceUser: {
      image: string | null;
      displayName: string | null;
  } | null;
} & {
  message: string;
  type: $Enums.NotificationType;
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  communityId: string | null;
  sourceUserId: string | null;
  badgeId: string | null;
  isRead: boolean;
};

export const createNotification = async (
  userId: string,
  type: NotificationType,
  sourceUserId?: string,
  badgeId?: string,
  communityId?: string,
  reportId?: string,
) => {
  let message = "新しい通知が届きました";
  switch (type) {
    case "BADGE":
      message = "新しいバッジを獲得しました";
      break;
    case "COMMUNITY_JOIN":
      message = "コミュニティに参加しました";
      break;
    case "FOLLOW":
      message = "フォローされました";
      break;
    case "REACTION_HEART":
      message = "HEART が送られました";
      break;
    case "REACTION_FIRE":
      message = "FIRE が送られました";
      break;
    case "REACTION_CHECK":
      message = "CHECK が送られました";
      break;
  }

  await prisma.notification.create({
    data: {
      userId,
      sourceUserId,
      badgeId,
      communityId,
      reportId,
      message,
      type,
    },
  });
};

export default app;
