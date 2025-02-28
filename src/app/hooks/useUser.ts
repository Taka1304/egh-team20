"use client";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

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

type UpdateProfileData = {
  displayName?: string;
  bio?: string;
  isPrivate?: boolean;
  image?: string;
  email?: string;
  interests?: string[];
  goals?: string[];
};

type UseUserReturn = {
  user: ProfileUser | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  isOwnProfile: boolean;
  updateProfile: (data: UpdateProfileData) => Promise<boolean>;
};

const fetcher = async (url: string) => {
  // ユーザー名かIDのいずれかでAPIを呼び出す
  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to fetch user");
  }

  return response.json();
};

export function useUser(usernameParam?: string): UseUserReturn {
  const { data: session } = useSession();
  const params = useParams<{ username: string }>();
  const username = usernameParam || params?.username;
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const cacheKey = username ? `/api/users/${username}` : session?.user?.id ? `/api/users/${session.user.id}` : null;

  // SWRでデータ取得
  const { data, error, mutate } = useSWR(cacheKey, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
    revalidateOnReconnect: false,
    onSuccess: (data) => {
      // ログインユーザーと表示するユーザーが同じかチェック
      if (session?.user?.id === data.id) {
        setIsOwnProfile(true);
      }
    },
  });

  // プロフィール更新機能
  const updateProfile = async (data: UpdateProfileData): Promise<boolean> => {
    try {
      if (!cacheKey) {
        throw new Error("ユーザー情報が読み込まれていません");
      }

      const userId = username || session?.user?.id;
      if (!userId) {
        throw new Error("ユーザーIDが不明です");
      }

      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "プロフィールの更新に失敗しました");
      }

      // 更新成功後にデータを再取得
      await mutate();
      return true;
    } catch (err) {
      console.error("プロフィール更新エラー:", err);
      return false;
    }
  };

  // データ再取得関数
  const refetch = async () => {
    await mutate();
  };

  return {
    user: (data as ProfileUser) || null,
    isLoading: !data && !error,
    error: error instanceof Error ? error : null,
    refetch,
    isOwnProfile,
    updateProfile,
  };
}
