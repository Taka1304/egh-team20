import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
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

app.patch("/:id", zValidator("json", userScheme), async (c) => {
  const id = c.req.param("id");
  const body = c.req.valid("json");

  try {
    const user = await prisma.user.upsert({
      where: { id: id },
      update: { ...body, updatedAt: new Date() },
      create: { ...body, id: id, createdAt: new Date(), updatedAt: new Date() },
    });
    return c.json({ message: "User updated", date: new Date(), user: user });
  } catch (error) {
    console.error("Error updating user:", error);
    return c.text(error as string);
  }
});
export default app;
