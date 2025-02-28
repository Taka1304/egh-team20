"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export type RecommendedUser = {
  id: string;
  displayName?: string;
  image?: string;
  interests: string[];
  isFollowing: boolean; // フォロー状態を追加
};

export function useRecommendUser() {
  const { data: session } = useSession();
  const [recommendedUsers, setRecommendedUsers] = useState<RecommendedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecommendedUsers = async () => {
    if (!session?.user?.id) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${session.user.id}/recommended?recommendedUserNum=5`);
      if (!response.ok) {
        throw new Error("Failed to fetch recommended users");
      }
      const data = await response.json();
      setRecommendedUsers(data.recommendedUsers || []);
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
      setRecommendedUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? { ...user, isFollowing: true } : user)),
      );

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
      setRecommendedUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? { ...user, isFollowing: false } : user)),
      );

      return true;
    } catch (error) {
      console.error("フォロー解除処理に失敗しました:", error);
      return false;
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (session?.user?.id) {
      fetchRecommendedUsers();
    }
  }, [session]);

  return {
    recommendedUsers,
    isLoading,
    error,
    followUser,
    unfollowUser,
    refetch: fetchRecommendedUsers,
  };
}
