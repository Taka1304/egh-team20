import { Hono } from "hono";
import dayjs from "dayjs";

const app = new Hono()
  .get("/", (c) => c.text("Hello World"))
  .get("/now", (c) => c.text(`Hello ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`));

export default app