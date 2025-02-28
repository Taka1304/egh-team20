"use client";

import { ProfileEditDialogView } from "@/app/_features/Profile/ProfileEditDialog/ProfileEditDialogView";
import type { ProfileUser } from "@/app/hooks/useUser";
import { client } from "@/lib/hono";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type Interest = {
  id: string;
  name: string;
};

type ProfileEditDialogProps = {
  user: ProfileUser;
  onClose: () => void;
  onSave: () => void;
};

export function ProfileEditDialog({ user, onClose, onSave }: ProfileEditDialogProps) {
  // 利用可能な興味カテゴリのリスト
  const [availableInterests, setAvailableInterests] = useState<Interest[]>([]);
  const [isLoadingInterests, setIsLoadingInterests] = useState(false);

  // 編集用の状態を初期化
  const [isLoading, setIsLoading] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    displayName: user.displayName || user.name || "",
    bio: user.bio || "",
    isPrivate: user.isPrivate || false,
    interests: user.UserInterest ? user.UserInterest.map((ui) => ui.interest.id) : [],
    goals: user.goals ? user.goals.map((g) => g.text) : [],
    // 以下はAPIで更新しない項目だが、UIのために必要
    following: user.followingCount,
    followers: user.followerCount,
    avatar: user.image || "",
  });

  // カテゴリ一覧を取得
  useEffect(() => {
    const fetchInterests = async () => {
      setIsLoadingInterests(true);
      try {
        const response = await client.api.interests.$get();
        if (!response.ok) {
          throw new Error("興味カテゴリの取得に失敗しました");
        }

        const data = await response.json();
        setAvailableInterests(data);
      } catch (error) {
        console.error("興味カテゴリの取得エラー:", error);
        toast.error("興味カテゴリの取得に失敗しました");
      } finally {
        setIsLoadingInterests(false);
      }
    };

    fetchInterests();
  }, []);

  // フィールド1つを更新する関数
  const setField = useCallback(<K extends keyof typeof editedProfile>(key: K, value: (typeof editedProfile)[K]) => {
    setEditedProfile((prev) => ({ ...prev, [key]: value }));
  }, []);

  // 保存処理
  const handleSave = async () => {
    try {
      setIsLoading(true);

      const response = await client.api.users[":id"].$patch({
        param: { id: user.id },
        json: {
          displayName: editedProfile.displayName,
          bio: editedProfile.bio,
          isPrivate: editedProfile.isPrivate,
          interests: editedProfile.interests,
          goals: editedProfile.goals,
        },
      });

      if (!response.ok) {
        throw new Error("プロフィールの更新に失敗しました");
      }

      toast.success("プロフィールを更新しました");
      onSave(); // 親コンポーネントに保存完了を通知
    } catch (err) {
      console.error("プロフィール更新エラー:", err);
      toast.error("プロフィールの更新に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  // 興味・カテゴリの選択を処理する関数
  const handleInterestToggle = (interestId: string) => {
    setField(
      "interests",
      editedProfile.interests.includes(interestId)
        ? editedProfile.interests.filter((id) => id !== interestId)
        : [...editedProfile.interests, interestId],
    );
  };

  const handleGoalsChange = (newGoals: string[]) => {
    setField("goals", newGoals);
  };

  return (
    <ProfileEditDialogView
      avatar={editedProfile.avatar}
      following={editedProfile.following}
      followers={editedProfile.followers}
      displayName={editedProfile.displayName}
      setDisplayName={(val) => setField("displayName", val)}
      bio={editedProfile.bio}
      setBio={(val) => setField("bio", val)}
      selectedInterests={editedProfile.interests}
      availableInterests={availableInterests}
      isLoadingInterests={isLoadingInterests}
      onInterestToggle={handleInterestToggle}
      goals={editedProfile.goals}
      onGoalsChange={handleGoalsChange}
      isPrivate={editedProfile.isPrivate}
      setIsPrivate={(val) => setField("isPrivate", val)}
      isLoading={isLoading}
      onClose={onClose}
      onSave={handleSave}
    />
  );
}
