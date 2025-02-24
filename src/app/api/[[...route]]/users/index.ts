import { prisma } from "@/lib/prisma";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono();

const userScheme = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  emailVerified: z.string().optional(),
  image: z.string().optional(),
  displayName: z.string().optional(),
  bio: z.string().optional(),
  isPrivate: z.boolean().optional(),
  UserInterest: z.array(z.object({ interest: z.string() }).optional()),
  goals: z.array(
    z
      .object({
        id: z.string(),
        isPublic: z.boolean(),
        text: z.string(),
      })
      .optional(),
  ),
});

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
export default app;
