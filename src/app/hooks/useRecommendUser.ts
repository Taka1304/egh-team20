"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { mutate } from "swr";

export type RecommendedUser = {
  id: string;
  displayName?: string;
  image?: string;
  interests: string[];
  isFollowing: boolean;
};

let cachedRecommendedUsers: RecommendedUser[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000;

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
      const response = await fetch(`/api/users/${session.user.id}/recommended?recommendedUserNum=6`);
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

  const followUser = async (userId: string): Promise<boolean> => {
    // セッション・ユーザーIDチェック
    if (!session?.user?.id) {
      console.error("フォロー操作を実行できません: ユーザーがログインしていません");
      return false;
    }

    try {
      const response = await fetch(`/api/users/${userId}/follow/${session.user.id}`, {
        method: "POST",
      });

      if (response.ok) {
        // おすすめユーザーリストのキャッシュを更新
        await mutate("/api/users/recommended");

        // フォローされたユーザーのプロフィールを更新
        await mutate(`/api/users/${userId}`);

        // 自分のプロフィールのフォロー数も更新
        await mutate((key) => typeof key === "string" && key.includes("/api/users/") && !key.includes(userId));

        // ユーザーの統計情報も更新
        await mutate((key) => typeof key === "string" && key.includes(`/api/users/${userId}/stats`));
        await mutate((key) => typeof key === "string" && key.includes(`/api/users/${session.user.id}/stats`));

        return true;
      }
      return false;
    } catch (error) {
      console.error("フォローエラー:", error);
      return false;
    }
  };

  const unfollowUser = async (userId: string): Promise<boolean> => {
    // セッション・ユーザーIDチェック
    if (!session?.user?.id) {
      console.error("フォロー解除操作を実行できません: ユーザーがログインしていません");
      return false;
    }

    try {
      const response = await fetch(`/api/users/${userId}/follow/${session.user.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // おすすめユーザーリストのキャッシュを更新
        await mutate("/api/users/recommended");

        // フォロー解除されたユーザーのプロフィールを更新
        await mutate(`/api/users/${userId}`);

        // 自分のプロフィールのフォロー数も更新
        await mutate((key) => typeof key === "string" && key.includes("/api/users/") && !key.includes(userId));

        // ユーザーの統計情報も更新
        await mutate((key) => typeof key === "string" && key.includes(`/api/users/${userId}/stats`));
        await mutate((key) => typeof key === "string" && key.includes(`/api/users/${session.user.id}/stats`));

        return true;
      }
      return false;
    } catch (error) {
      console.error("フォロー解除エラー:", error);
      return false;
    }
  };

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
    refreshRecommendations: () => fetchRecommendedUsers(true),
  };
}
