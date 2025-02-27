import { recoverFromNotFound, shuffleArray } from "@/app/api/[[...route]]/utils";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { getServerSession } from "next-auth";
import { z } from "zod";

const app = new Hono();

const userScheme = z.object({
  name: z.string().optional(),
  email: z.string(),
  emailVerified: z.date().optional(),
  image: z.string().optional(),
  displayName: z.string().optional(),
  bio: z.string().optional(),
  isPrivate: z.boolean().optional(),
});

// ユーザー情報を取得するエンドポイント
app
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    try {
      const data = await prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          goals: {
            select: {
              id: true,
              isPublic: true,
              text: true,
            },
          },
          UserInterest: {
            select: {
              interest: true,
            },
          },
        },
      });

      const followerCount = await prisma.follow.count({
        where: { followerId: id },
      });
      const followingCount = await prisma.follow.count({
        where: { followingId: id },
      });

      if (!data) {
        return c.json({ message: "user not found" }, 404);
      }

      const formattedData = {
        ...data,
        followerCount: followerCount,
        followingCount: followingCount,
      };

      return c.json(formattedData);
    } catch (error) {
      console.error("Error fetching user:", error);
      return c.text(error as string);
    }
  })
  // ユーザー情報を更新するエンドポイント
  .patch("/:id", zValidator("json", userScheme), async (c) => {
    const id = c.req.param("id");
    const body = c.req.valid("json");

    try {
      const user = await prisma.user.update({
        where: { id: id },
        data: body,
      });
      return c.json({ message: "User updated", user: user });
    } catch (error) {
      if (error instanceof Error) {
        return c.json({ error: error.message }, 500);
      }
      return c.json({ error: "Unknown error" }, 500);
    }
  })
  // フォローするエンドポイント
  .post("/:id/follow/:followerId", async (c) => {
    const id = c.req.param("id");
    const followerId = c.req.param("followerId");
    const session = await getServerSession(authOptions);
    if (!session) {
      return c.json({ error: "ログインしていないユーザーです" }, 401);
    }

    try {
      const follow = await recoverFromNotFound(
        prisma.follow.create({
          data: {
            followerId: followerId,
            followingId: id,
          },
        }),
      );

      if (!follow) {
        return c.json({ error: "既にフォローしています" }, 500);
      }

      return c.json({ message: "フォロー完了", follow: follow });
    } catch (error) {
      if (!error) {
        console.error("ユーザーのフォロー処理に失敗しました:", error);
      } else {
        console.error("ユーザーのフォロー処理に失敗しました:");
      }
      return c.json({ error: "ユーザーフォロー処理に失敗しました" }, 500);
    }
  })
  // フォロー解除するエンドポイント
  .delete("/:id/follow/:followerId", async (c) => {
    const id = c.req.param("id");
    const followerId = c.req.param("followerId");
    const session = await getServerSession(authOptions);
    if (!session) {
      return c.json({ error: "ログインしていないユーザーです" }, 401);
    }

    try {
      const follow = await recoverFromNotFound(
        prisma.follow.delete({
          where: {
            followerId_followingId: {
              followingId: id,
              followerId: followerId,
            },
          },
        }),
      );
      if (!follow) {
        return c.json({ error: "フォローしていません" }, 500);
      }

      return c.json({ message: "フォロー解除完了", follow: follow });
    } catch (error) {
      if (!error) {
        console.error("ユーザーのフォロー解除処理に失敗しました:", error);
      } else {
        console.error("ユーザーのフォロー解除処理に失敗しました:");
      }
      return c.json({ error: "ユーザーフォロー解除処理に失敗しました" }, 500);
    }
  })

  // おすすめのユーザーを取得するエンドポイント
  .get("/:id/recommended", async (c) => {
    const id = c.req.param("id");
    const getUserNum = 5;

    try {
      // 現在のユーザーがフォローしているカテゴリーを取得
      const userInterests = await prisma.userInterest.findMany({
        where: { userId: id },
        select: { interestId: true },
      });

      const interests = userInterests.map((ui) => ui.interestId);

      // 現在のユーザーがフォローしているユーザーを取得
      const followingUsers = await prisma.follow.findMany({
        where: { followerId: id },
        select: { followingId: true },
      });

      const followingUserIds = followingUsers.map((fu) => fu.followingId);

      // 同じカテゴリーをフォローしている他のユーザーを取得
      const sameInterestsUserPromises = interests.map(async (interest) => {
        return await prisma.userInterest.findMany({
          where: {
            interestId: interest,
            userId: { notIn: followingUserIds.concat(id) },
          },
          select: { userId: true },
          distinct: ["userId"],
        });
      });

      const sameInterestsUserResults = await Promise.all(sameInterestsUserPromises);
      const sameInterestsUser = sameInterestsUserResults.flat();
      let selectedUsers = shuffleArray(sameInterestsUser).slice(0, getUserNum);

      // 同じカテゴリーをフォローしているユーザーが5人未満の場合、その他のユーザーから補充
      if (selectedUsers.length < getUserNum) {
        const additionalUsers = await prisma.user.findMany({
          where: {
            id: {
              notIn: sameInterestsUser
                .map((user) => user.userId)
                .concat(followingUserIds)
                .concat(id),
            },
          },
          select: { id: true },
          take: getUserNum - selectedUsers.length,
        });
        const additionalUsersSelect = additionalUsers.map((user) => ({ userId: user.id }));
        selectedUsers = selectedUsers.concat(additionalUsersSelect);
      }

      // 必要な情報を整形
      const recommendedUsers = recommendedUserProfiles.map((user) => ({
        id: user.id,
        displayName: user.displayName,
        image: user.image,
        interests: user.UserInterest.map((ui) => ui.interest.name),
      }));

      return c.json({ recommendedUsers });
    } catch (error) {
      console.error("Error fetching recommended users:", error);
      return c.json({ error: "Error fetching recommended users", details: error as string }, 500);
    }
  });

export default app;
