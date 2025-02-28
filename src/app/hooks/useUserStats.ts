"use client";

import { useEffect, useState } from "react";

type UserStats = {
  streakDays: number;
  postsCount: number;
  reactionsCount: number;
  badgesCount: number;
  continuityData: { date: string; days: number }[];
  postsData: { month: string; count: number }[];
  reactionData: { name: string; value: number }[];
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
      setError(null);

      const response = await fetch(`/api/users/${userId}/stats`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "統計情報の取得に失敗しました");
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error("統計情報取得エラー:", err);
      setError(err instanceof Error ? err : new Error("Unknown error"));
      setStats(null);
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
