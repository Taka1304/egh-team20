"use client";

import { ProfileEditDialogView } from "@/app/_features/Profile/ProfileEditDialog/ProfileEditDialogView";
import type { ProfileUser } from "@/app/hooks/useUser";
import { useCallback, useState } from "react";
import { toast } from "sonner";

type ProfileEditDialogProps = {
  user: ProfileUser;
  onClose: () => void;
  onSave: () => void;
};

export function ProfileEditDialog({ user, onClose, onSave }: ProfileEditDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    displayName: user.displayName || user.name || "",
    bio: user.bio || "",
    isPrivate: user.isPrivate || false,
    // 以下はAPIで更新しない項目だが、UIのために必要
    following: user.followingCount,
    followers: user.followerCount,
    avatar: user.image || "",
  });

  // フィールド1つを更新する共通関数
  const setField = useCallback(<K extends keyof typeof editedProfile>(key: K, value: (typeof editedProfile)[K]) => {
    setEditedProfile((prev) => ({ ...prev, [key]: value }));
  }, []);

  // 保存処理
  const handleSave = async () => {
    try {
      setIsLoading(true);

      // API呼び出し
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: editedProfile.displayName,
          bio: editedProfile.bio,
          isPrivate: editedProfile.isPrivate,
          email: user.email,
        }),
      });

      if (!response.ok) {
        let errorMessage = "プロフィールの更新に失敗しました";
        try {
          const errorData = await response.json();
          // エラーメッセージがオブジェクトの場合は適切に処理
          if (typeof errorData.error === "string") {
            errorMessage = errorData.error;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          } else if (typeof errorData.error === "object" && errorData.error !== null) {
            errorMessage = JSON.stringify(errorData.error);
          }
        } catch (e) {
          errorMessage = (await response.text()) || errorMessage;
        }

        throw new Error(errorMessage);
      }

      toast.success("プロフィールを更新しました");
      onSave(); // 親コンポーネントに保存完了を通知
    } catch (err) {
      console.error("プロフィール更新エラー:", err);
      toast.error(err instanceof Error ? err.message : "プロフィールの更新に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  // 興味・カテゴリーを文字列に変換
  const interests = user.UserInterest ? user.UserInterest.map((ui) => ui.interest.name).join(", ") : "";

  // 目標を文字列に変換
  const goals = user.goals ? user.goals.map((g) => g.text).join(", ") : "";

  return (
    <ProfileEditDialogView
      avatar={editedProfile.avatar}
      following={editedProfile.following}
      followers={editedProfile.followers}
      displayName={editedProfile.displayName}
      setDisplayName={(val) => setField("displayName", val)}
      bio={editedProfile.bio}
      setBio={(val) => setField("bio", val)}
      interests={interests}
      setInterests={() => {}}
      goals={goals}
      setGoals={() => {}}
      isPrivate={editedProfile.isPrivate}
      setIsPrivate={(val) => setField("isPrivate", val)}
      isLoading={isLoading}
      onClose={onClose}
      onSave={handleSave}
    />
  );
}
