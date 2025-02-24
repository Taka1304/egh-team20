import { prisma } from "@/lib/prisma";
import { Hono } from "hono";

const app = new Hono().get("/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        _count: {
          select: {
            following: true,
            followedBy: true,
          },
        },
      },
    });

    if (!data) {
      return c.json({ message: "user not found" }, 404);
    }
    return c.json(data);
  } catch (error) {
    console.error("Error fetching user:", error);
    return c.text(error as string);
  }
});
export default app;
