"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export type RecommendedUser = {
  id: string;
  displayName?: string;
  image?: string;
  interests: string[];
};

type UseRecommendUserReturn = {
  recommendedUsers: RecommendedUser[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  followUser: (userId: string) => Promise<boolean>;
  unfollowUser: (userId: string) => Promise<boolean>;
};

export function useRecommendUser(userId?: string, recommendedUserNum = 5): UseRecommendUserReturn {
  const { data: session } = useSession();
  const [recommendedUsers, setRecommendedUsers] = useState<RecommendedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecommendedUsers = async () => {
    try {
      setIsLoading(true);
      // biome-ignore lint/style/useConst: <explanation>
      let targetUserId = userId || session?.user?.id;

      if (!targetUserId) {
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `/api/users/${targetUserId}/recommended?recommendedUserNum=${recommendedUserNum.toString()}`,
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "おすすめユーザーの取得に失敗しました");
      }

      const data = await response.json();
      setRecommendedUsers(data.recommendedUsers || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("Unknown error occurred"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // フォロー処理
  const followUser = async (targetUserId: string): Promise<boolean> => {
    if (!session?.user?.id) return false;

    try {
      const response = await fetch(`/api/users/${targetUserId}/follow/${session.user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("フォロー失敗:", errorText);
        return false;
      }

      // 成功したら推奨リストを更新
      await fetchRecommendedUsers();
      return true;
    } catch (err) {
      console.error("フォロー処理でエラーが発生しました:", err);
      return false;
    }
  };

  // フォロー解除処理
  const unfollowUser = async (targetUserId: string): Promise<boolean> => {
    if (!session?.user?.id) return false;

    try {
      const response = await fetch(`/api/users/${targetUserId}/follow/${session.user.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("フォロー解除失敗:", errorText);
        return false;
      }

      // 成功したら推奨リストを更新
      await fetchRecommendedUsers();
      return true;
    } catch (err) {
      console.error("フォロー解除処理でエラーが発生しました:", err);
      return false;
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: 依存する値だけを指定
  useEffect(() => {
    fetchRecommendedUsers();
  }, [userId, session, recommendedUserNum]);

  return {
    recommendedUsers,
    isLoading,
    error,
    refetch: fetchRecommendedUsers,
    followUser,
    unfollowUser,
  };
}
