import { prisma } from "@/lib/prisma";
import { $Enums } from "@prisma/client";
import type { Context } from "hono";

export async function CheckReportAccessPermission(reportId: string, userId: string | undefined, c: Context) {
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
              followerId: userId,
            },
            take: 1,
          },
        },
      },
      reactions: {
        select: {
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
  const isOwner = report.user.id === userId;
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
  return c.json({ report }, 200);
}
