import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    displayName?: string;
    isPrivate?: boolean;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      isPrivate: boolean;
      displayName: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    displayName: string;
    isPrivate: boolean;
    image: string;
  }
}
