"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type UserStats = {
  streakDays: number;
  postsCount: number;
  reactionsCount: number;
  badgesCount: number;
};

export function useUserStats(userId?: string) {
  const { data: session } = useSession();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = async () => {
    const targetUserId = userId || session?.user?.id;
    if (!targetUserId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/users/${targetUserId}/stats`);

      if (!response.ok) {
        throw new Error("統計情報の取得に失敗しました");
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchStats();
  }, [userId, session]);

  return { stats, isLoading, error };
}
