import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { zValidator } from "@hono/zod-validator";
import dayjs from "dayjs";
import { Hono } from "hono";
import { getServerSession } from "next-auth";
import { z } from "zod";

const app = new Hono();

app.post(
  "/upload",
  zValidator(
    "form",
    z.object({
      file: z.instanceof(File),
      type: z.enum(["profile", "report"]),
    }),
  ),
  async (c) => {
    try {
      const { file, type } = c.req.valid('form')
      const session = await getServerSession(authOptions)

      if (!session) {
        return c.json({ error: "ログインしていないユーザーです" }, 401);
      }
      if (!file) {
        return c.json({ error: "ファイルがありません" }, 400);
      }

      const fileName = `${session.user.id}/${dayjs().format("YYYYMMDD")}-${file.name}`;

      // Supabase にアップロード
      const { error } = await supabase.storage.from(type).upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

      if (error) {
        console.error(error);
        return c.json({ error: error.message }, 500);
      }

      // 公開 URL の取得
      const { data: publicUrlData } = supabase.storage.from(type).getPublicUrl(fileName);

      return c.json({ url: publicUrlData.publicUrl });

    } catch (error) {
      if (error instanceof Error) {
        return c.json({ error: error.message }, 500);
      }
      return c.json({ error: "Unknown error" }, 500);
    }
  },
);

export default app;
