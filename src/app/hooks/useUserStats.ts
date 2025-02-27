"use client";

import { useEffect, useState } from "react";

type UserStats = {
  streakDays: number;
  postsCount: number;
  reactionsCount: number;
  badgesCount: number;
};

export function useUserStats(userId?: string) {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      // Todo Honoを使う
      const response = await fetch(`/api/users/${userId}/stats`);

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
  }, [userId]);

  return { stats, isLoading, error };
}
