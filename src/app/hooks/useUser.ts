"use client";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

export function useUser(usernameParam?: string): UseUserReturn {
  const { data: session } = useSession();
  const params = useParams<{ username: string }>();
  const username = usernameParam || params?.username;
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      let userId: string;

      if (username) {
        userId = username;
      } else if (session?.user?.id) {
        // ログインユーザーのIDを使用
        userId = session.user.id;
        setIsOwnProfile(true);
      } else {
        // ログインしていない、かつユーザー名の指定がない
        setUser(null);
        setIsLoading(false);
        return;
      }

      // API呼び出し
      const response = await fetch(`/api/users/${userId}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch user");
      }

      const data = await response.json();

      // ログインユーザーと表示するユーザーが同じかチェック
      if (session?.user?.id === data.id) {
        setIsOwnProfile(true);
      }

      setUser(data as ProfileUser);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("Unknown error occurred"));
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // プロフィール更新機能
  const updateProfile = async (data: UpdateProfileData): Promise<boolean> => {
    try {
      if (!user) {
        throw new Error("ユーザー情報が読み込まれていません");
      }

      const response = await fetch(`/api/users/${user.id}`, {
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
      await fetchUser();
      return true;
    } catch (err) {
      console.error("プロフィール更新エラー:", err);
      if (err instanceof Error) {
        setError(err);
      }
      return false;
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchUser();
  }, [username, session]);

  return {
    user,
    isLoading,
    error,
    refetch: fetchUser,
    isOwnProfile,
    updateProfile,
  };
}
