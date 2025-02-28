import { calculateStreakDays, recoverFromNotFound, shuffleArray } from "@/app/api/[[...route]]/utils";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { getServerSession } from "next-auth";
import { z } from "zod";

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
const app = new Hono()
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
          UserBadge: {
            select: {
              badge: true,
            },
          },
          _count: {
            select: {
              followedBy: true, // フォロワー数
              following: true, // フォロー数
            },
          },
        },
      });

      if (!data) {
        return c.json({ message: "user not found" }, 404);
      }

      const { _count, ...userData } = data;

      const formattedData = {
        ...userData,
        followerCount: _count.followedBy,
        followingCount: _count.following,
      };

      return c.json(formattedData);
    } catch (error) {
      console.error("ユーザー情報の取得に失敗しました:", error);
      return c.json({ error: "ユーザー情報の取得に失敗しました", details: error as string }, 500);
    }
  })
  // ユーザーの実績を取得するエンドポイント
  .get("/:id/stats", async (c) => {
    const id = c.req.param("id");

    try {
      // 投稿数を取得
      const postsCount = await prisma.dailyReport.count({
        where: { userId: id },
      });

      // リアクション数を取得 (ユーザーの投稿に対するリアクション)
      const reactionsCount = await prisma.reaction.count({
        where: {
          report: { userId: id },
        },
      });

      // バッジ取得数
      const badgesCount = await prisma.userBadge.count({
        where: { userId: id },
      });

      // 継続学習日数の計算
      const contributions = await prisma.learningContribution.findMany({
        where: { userId: id },
        orderBy: { activityDate: "asc" },
      });

      // 継続日数を計算するロジック
      // biome-ignore lint/style/useConst: <explanation>
      let streakDays = calculateStreakDays(contributions);

      return c.json({
        postsCount,
        reactionsCount,
        badgesCount,
        streakDays,
      });
    } catch (error) {
      console.error("ユーザー統計情報の取得に失敗しました:", error);
      return c.json({ error: "ユーザー統計情報の取得に失敗しました" }, 500);
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
  .get(
    "/:id/recommended",
    zValidator(
      "query",
      z.object({
        recommendedUserNum: z.coerce.number().optional(),
      }),
    ),
    async (c) => {
      const id = c.req.param("id");
      const recommendedUserNum = c.req.valid("query").recommendedUserNum ?? 5;

      try {
        // 現在のユーザーがフォローしているカテゴリーを取得
        const userInterests = await prisma.userInterest.findMany({
          where: { userId: id },
          select: { interestId: true },
        });

        // 既にフォローしているユーザーを省くため，現在のユーザーがフォローしているユーザーを取得
        const followingUsers = await prisma.follow.findMany({
          where: { followerId: id },
          select: { followingId: true },
        });
        const followingUserIds = followingUsers.map((fu) => fu.followingId);

        // 同じカテゴリーをフォローしている他のユーザーを取得
        const recommendedUserProfilesResult = await prisma.user.findMany({
          where: {
            UserInterest: {
              some: {
                interestId: { in: userInterests.map((interest) => interest.interestId) },
              },
            },
            id: {
              notIn: followingUserIds.concat(id),
            },
          },
          select: {
            id: true,
            displayName: true,
            image: true,
            UserInterest: {
              select: {
                interest: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        });

        let recommendedUserProfiles = shuffleArray(recommendedUserProfilesResult).slice(0, recommendedUserNum);

        // 同じカテゴリーをフォローしているユーザーが5人未満の場合、その他のユーザーから補充
        if (recommendedUserProfiles.length < recommendedUserNum) {
          const additionalUsers = await prisma.user.findMany({
            where: {
              id: {
                notIn: recommendedUserProfiles
                  .map((user) => user.id)
                  .concat(followingUserIds)
                  .concat(id),
              },
            },
            select: {
              id: true,
              displayName: true,
              image: true,
              UserInterest: {
                select: {
                  interest: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
            take: recommendedUserNum - recommendedUserProfiles.length,
          });
          recommendedUserProfiles = recommendedUserProfiles.concat(additionalUsers);
        }

        // 必要な情報を整形
        const recommendedUsers = recommendedUserProfiles.map((user) => ({
          id: user.id,
          displayName: user.displayName,
          image: user.image,
          interests: user.UserInterest.map((ui) => ui.interest.name),
          isFollowing: false,
        }));

        return c.json({ recommendedUsers });
      } catch (error) {
        console.error("レコメンド情報の取得に失敗しました:", error);
        return c.json({ error: "レコメンド情報の取得に失敗しました", details: error as string }, 500);
      }
    },
  );

// フォロー中のユーザーを取得するエンドポイント
app.get("/:id/following", async (c) => {
  const id = c.req.param("id");

  try {
    // ユーザーがフォローしているユーザー一覧を取得
    const followingRelations = await prisma.follow.findMany({
      where: { followerId: id },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            email: true,
            displayName: true,
            image: true,
          },
        },
      },
    });

    // 認証情報から直接ユーザーIDを取得
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    // ユーザー情報を整形
    const users = await Promise.all(
      followingRelations.map(async (relation) => {
        const user = relation.following;

        // 現在のユーザーがこのユーザーをフォローしているか
        let isFollowing = false;
        if (currentUserId) {
          const followRelation = await prisma.follow.findFirst({
            where: {
              followerId: currentUserId,
              followingId: user.id,
            },
          });
          isFollowing = !!followRelation;
        }

        return {
          ...user,
          isFollowing,
        };
      }),
    );

    return c.json({ users });
  } catch (error) {
    console.error("フォロー中ユーザーの取得に失敗しました:", error);
    return c.json({ error: "フォロー中ユーザーの取得に失敗しました", details: error as string }, 500);
  }
});

// フォロワーを取得するエンドポイント
app.get("/:id/followers", async (c) => {
  const id = c.req.param("id");

  try {
    // ユーザーをフォローしているユーザー一覧を取得
    const followerRelations = await prisma.follow.findMany({
      where: { followingId: id },
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            email: true,
            displayName: true,
            image: true,
          },
        },
      },
    });

    // 認証情報から直接ユーザーIDを取得
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    const users = await Promise.all(
      followerRelations.map(async (relation) => {
        const user = relation.follower;

        // 現在のユーザーがこのユーザーをフォローしているか
        let isFollowing = false;
        if (currentUserId) {
          const followRelation = await prisma.follow.findFirst({
            where: {
              followerId: currentUserId,
              followingId: user.id,
            },
          });
          isFollowing = !!followRelation;
        }

        return {
          ...user,
          isFollowing,
        };
      }),
    );

    return c.json({ users });
  } catch (error) {
    console.error("フォロワーの取得に失敗しました:", error);
    return c.json({ error: "フォロワーの取得に失敗しました", details: error as string }, 500);
  }
});

export default app;
