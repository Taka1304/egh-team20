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

export type FollowCounts = {
  followingCount: number;
  followerCount: number;
};

export function useFollowUsers(userId?: string, type: "following" | "followers" = "following") {
  const { data: session } = useSession();
  const [users, setUsers] = useState<FollowUser[]>([]);
  const [counts, setCounts] = useState<FollowCounts>({ followingCount: 0, followerCount: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFollowCounts = async (targetUserId: string) => {
    try {
      const response = await fetch(`/api/users/${targetUserId}`);
      if (!response.ok) {
        throw new Error("フォロー数の取得に失敗しました");
      }
      const data = await response.json();
      setCounts({
        followingCount: data.followingCount || 0,
        followerCount: data.followerCount || 0,
      });
    } catch (err) {
      console.error("フォロー数の取得に失敗:", err);
    }
  };

  const fetchFollowUsers = async () => {
    if (!userId && !session?.user?.id) {
      setError("ユーザーIDが提供されていません");
      setIsLoading(false);
      return;
    }

    const targetUserId = userId || session?.user?.id;
    if (!targetUserId) return;

    try {
      setIsLoading(true);

      // フォロー/フォロワー数を取得
      await fetchFollowCounts(targetUserId);

      // フォロー/フォロワーのユーザーリストを取得
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
    const currentUserId = session.user.id;
    const targetUserId = userId || currentUserId;

    try {
      const response = await fetch(`/api/users/${targetId}/follow/${currentUserId}`, {
        method: "POST",
      });

      if (!response.ok) return false;

      // 成功したらユーザーリストを更新
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === targetId ? { ...user, isFollowing: true } : user)));

      // 自分のプロフィールを見ている場合は、フォロー数を+1
      if (targetUserId === currentUserId) {
        setCounts((prev) => ({
          ...prev,
          followingCount: prev.followingCount + 1,
        }));
      }

      // 相手のプロフィールを見ている場合は、フォロワー数を+1
      if (targetUserId === targetId) {
        setCounts((prev) => ({
          ...prev,
          followerCount: prev.followerCount + 1,
        }));
      }

      return true;
    } catch (error) {
      console.error("フォロー処理に失敗しました:", error);
      return false;
    }
  };

  const handleUnfollow = async (targetId: string) => {
    if (!session?.user?.id) return false;
    const currentUserId = session.user.id;
    const targetUserId = userId || currentUserId;

    try {
      const response = await fetch(`/api/users/${targetId}/follow/${currentUserId}`, {
        method: "DELETE",
      });

      if (!response.ok) return false;

      // 成功したらユーザーリストを更新
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === targetId ? { ...user, isFollowing: false } : user)));

      // 自分のプロフィールを見ている場合は、フォロー数を-1
      if (targetUserId === currentUserId) {
        setCounts((prev) => ({
          ...prev,
          followingCount: Math.max(0, prev.followingCount - 1),
        }));
      }

      // 相手のプロフィールを見ている場合は、フォロワー数を-1
      if (targetUserId === targetId) {
        setCounts((prev) => ({
          ...prev,
          followerCount: Math.max(0, prev.followerCount - 1),
        }));
      }

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
    counts,
    isLoading,
    error,
    refetch: fetchFollowUsers,
    follow: handleFollow,
    unfollow: handleUnfollow,
  };
}
