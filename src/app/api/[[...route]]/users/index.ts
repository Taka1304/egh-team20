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
app.get("/:id", async (c) => {
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
});

// ユーザー情報を更新するエンドポイント
app.patch("/:id", zValidator("json", userScheme), async (c) => {
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
});

// フォローするエンドポイント
app.post("/:id/follow/:followerId", async (c) => {
  const id = c.req.param("id");
  const followerId = c.req.param("followerId");
  const session = await getServerSession(authOptions);
  if (!session) {
    return c.json({ error: "ログインしていないユーザーです" }, 401);
  }

  try {
    const follow = await prisma.follow.upsert({
      where: {
        followerId_followingId: {
          followingId: id,
          followerId: followerId,
        },
      },
      update: {},
      create: {
        followerId: followerId,
        followingId: id,
      },
    });

    return c.json({ message: "フォロー完了", follow: follow });
  } catch (error) {
    if (!error) {
      console.error("ユーザーのフォロー処理に失敗しました:", error);
    } else {
      console.error("ユーザーのフォロー処理に失敗しました:");
    }
    return c.json({ error: "ユーザーフォロー処理に失敗しました" }, 500);
  }
});

// フォロー解除するエンドポイント
app.delete("/:id/follow/:followerId", async (c) => {
  const id = c.req.param("id");
  const followerId = c.req.param("followerId");
  const session = await getServerSession(authOptions);
  if (!session) {
    return c.json({ error: "ログインしていないユーザーです" }, 401);
  }

  try {
    const follow = await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followingId: id,
          followerId: followerId,
        },
      },
    });

    return c.json({ message: "フォロー解除完了", follow: follow });
  } catch (error) {
    const isFollowing = await prisma.follow.findFirst({
      where: {
        followerId: followerId,
        followingId: id,
      },
    });
    if (!isFollowing) {
      return c.json({ error: "既にフォローが解除されています" }, 500);
    }
    if (!error) {
      console.error("ユーザーのフォロー解除処理に失敗しました:", error);
    } else {
      console.error("ユーザーのフォロー解除処理に失敗しました:");
    }
    return c.json({ error: "ユーザーフォロー解除処理に失敗しました" }, 500);
  }
});
export default app;
