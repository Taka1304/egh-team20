import { prisma } from "@/lib/prisma";
import type { $Enums, Notification, NotificationType } from "@prisma/client";
import { Hono } from "hono";
import { upgradeWebSocket } from "hono/cloudflare-workers";
import type { WSContext } from "hono/ws";

const clients = new Map<string, WSContext<WebSocket>>();

const app = new Hono().get(

).get(
  "/ws/:userId",
  upgradeWebSocket((c) => {
    const { userId } = c.req.param();
    return {
      onMessage: (_evt, ws) => {
        console.log("Connection opened");
        clients.set(userId, ws);
      },
      onClose: () => {
        console.log("Connection closed");
      },
    };
  }),
);

const sendNotification = async (userId: string, data: Notification) => {
  if (clients.has(userId)) {
    clients.get(userId)?.send(JSON.stringify(data));
  }
};

export type NotificationResponse = {
  type: $Enums.NotificationType;
  id: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  communityId: string | null;
  sourceUserId: string | null;
  badgeId: string | null;
  isRead: boolean;
}

export const createNotification = async (
  userId: string,
  type: NotificationType,
  sourceUserId?: string,
  badgeId?: string,
  communityId?: string,
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

  const data = await prisma.notification.create({
    data: {
      userId,
      sourceUserId,
      badgeId,
      communityId,
      message,
      type,
    },
  });

  sendNotification(userId, data);
};

export default app;
