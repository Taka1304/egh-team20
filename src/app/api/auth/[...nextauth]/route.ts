import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

export const runtime = "nodejs";

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
