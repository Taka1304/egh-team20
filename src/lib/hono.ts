import type { HonoAppType } from "@/app/api/[[...route]]/route";
import { env } from "@/lib/env";
import { hc } from "hono/client";

export const client = hc<HonoAppType>(env.NEXT_PUBLIC_APP_URL);
