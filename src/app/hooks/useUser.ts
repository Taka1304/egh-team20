"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export type ProfileUser = {
  id: string;
  name?: string;
  email?: string;
  displayName?: string;
  image?: string;
  bio?: string;
  isPrivate?: boolean;
  followerCount: number;
  followingCount: number;
  goals?: {
    id: string;
    isPublic: boolean;
    text: string;
  }[];
  UserInterest?: {
    interest: {
      name: string;
    };
  }[];
};

type UseUserReturn = {
  user: ProfileUser | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};

export function useUser(): UseUserReturn {
  const { data: session } = useSession();
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = async () => {
    if (!session?.user?.id) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      // Honoクライアントの代わりに標準のfetchを使用
      const response = await fetch(`/api/users/${session.user.id}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch user");
      }

      const data = await response.json();
      setUser(data as ProfileUser);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("Unknown error occurred"));
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: sessionが変わったときだけ再取得
  useEffect(() => {
    fetchUser();
  }, [session]);

  return {
    user,
    isLoading,
    error,
    refetch: fetchUser,
  };
}
