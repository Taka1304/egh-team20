"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export type RecommendedUser = {
  id: string;
  displayName?: string;
  image?: string;
  interests: string[];
  isFollowing: boolean;
};

// キャッシュ
let cachedRecommendedUsers: RecommendedUser[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分間キャッシュ

export function useRecommendUser() {
  const { data: session } = useSession();
  const [recommendedUsers, setRecommendedUsers] = useState<RecommendedUser[]>(cachedRecommendedUsers);
  const [isLoading, setIsLoading] = useState(cachedRecommendedUsers.length === 0);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecommendedUsers = async (forceRefresh = false) => {
    if (!session?.user?.id) return;

    // キャッシュが有効な場合はフェッチしない
    const currentTime = Date.now();
    if (!forceRefresh && cachedRecommendedUsers.length > 0 && currentTime - lastFetchTime < CACHE_DURATION) {
      setRecommendedUsers(cachedRecommendedUsers);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${session.user.id}/recommended?recommendedUserNum=5`);
      if (!response.ok) {
        throw new Error("Failed to fetch recommended users");
      }
      const data = await response.json();

      // モジュールレベルのキャッシュを更新
      cachedRecommendedUsers = data.recommendedUsers || [];
      lastFetchTime = Date.now();

      setRecommendedUsers(cachedRecommendedUsers);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  const followUser = async (userId: string) => {
    if (!session?.user?.id) return false;

    try {
      const response = await fetch(`/api/users/${userId}/follow/${session.user.id}`, {
        method: "POST",
      });

      if (!response.ok) return false;

      // 成功したら、ユーザーリストを更新してUIに反映
      const updatedUsers = recommendedUsers.map((user) => (user.id === userId ? { ...user, isFollowing: true } : user));

      // ローカル状態とキャッシュの両方を更新
      setRecommendedUsers(updatedUsers);
      cachedRecommendedUsers = updatedUsers;

      return true;
    } catch (error) {
      console.error("フォロー処理に失敗しました:", error);
      return false;
    }
  };

  const unfollowUser = async (userId: string) => {
    if (!session?.user?.id) return false;

    try {
      const response = await fetch(`/api/users/${userId}/follow/${session.user.id}`, {
        method: "DELETE",
      });

      if (!response.ok) return false;

      // 成功したら、ユーザーリストを更新してUIに反映
      const updatedUsers = recommendedUsers.map((user) =>
        user.id === userId ? { ...user, isFollowing: false } : user,
      );

      // ローカル状態とキャッシュの両方を更新
      setRecommendedUsers(updatedUsers);
      cachedRecommendedUsers = updatedUsers;

      return true;
    } catch (error) {
      console.error("フォロー解除処理に失敗しました:", error);
      return false;
    }
  };

  // セッションが変わった時だけデータを取得
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (session?.user?.id) {
      fetchRecommendedUsers();
    }
  }, [session?.user?.id]);

  return {
    recommendedUsers,
    isLoading,
    error,
    followUser,
    unfollowUser,
    refetch: () => fetchRecommendedUsers(true), // 強制的に再取得する場合
  };
}
