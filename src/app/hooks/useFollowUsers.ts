"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export type FollowUser = {
  id: string;
  name?: string;
  displayName?: string;
  image?: string;
  email?: string;
  isFollowing?: boolean;
};

export function useFollowUsers(userId?: string, type: "following" | "followers" = "following") {
  const { data: session } = useSession();
  const [users, setUsers] = useState<FollowUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFollowUsers = async () => {
    if (!userId && !session?.user?.id) {
      setError("ユーザーIDが提供されていません");
      setIsLoading(false);
      return;
    }

    const targetUserId = userId || session?.user?.id;

    try {
      setIsLoading(true);
      const response = await fetch(`/api/users/${targetUserId}/${type}`);

      if (!response.ok) {
        throw new Error("ユーザーデータの取得に失敗しました");
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "不明なエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  // フォロー/アンフォロー機能
  const handleFollow = async (targetId: string) => {
    if (!session?.user?.id) return false;

    try {
      const response = await fetch(`/api/users/${targetId}/follow/${session.user.id}`, {
        method: "POST",
      });

      if (!response.ok) return false;

      // 成功したらユーザーリストを更新
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === targetId ? { ...user, isFollowing: true } : user)));

      return true;
    } catch (error) {
      console.error("フォロー処理に失敗しました:", error);
      return false;
    }
  };

  const handleUnfollow = async (targetId: string) => {
    if (!session?.user?.id) return false;

    try {
      const response = await fetch(`/api/users/${targetId}/follow/${session.user.id}`, {
        method: "DELETE",
      });

      if (!response.ok) return false;

      // 成功したらユーザーリストを更新
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === targetId ? { ...user, isFollowing: false } : user)));

      return true;
    } catch (error) {
      console.error("フォロー解除処理に失敗しました:", error);
      return false;
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchFollowUsers();
  }, [userId, type, session]);

  return {
    users,
    isLoading,
    error,
    refetch: fetchFollowUsers,
    follow: handleFollow,
    unfollow: handleUnfollow,
  };
}
