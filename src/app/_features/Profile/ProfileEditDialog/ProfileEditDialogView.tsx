"use client";

import { GoalInputFiled } from "@/app/_features/Profile/ProfileEditDialog/GoalInputFiled/GoalInputFiled";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, X } from "lucide-react";
import { InterestsCategoryDropdown } from "./InterestsCategoryDropdown";
import { ProfileEditTextarea } from "./ProfileEditTextarea";

type ProfileEditDialogViewProps = {
  avatar: string;
  following: number;
  followers: number;
  displayName: string;
  setDisplayName: (value: string) => void;
  bio: string;
  setBio: (value: string) => void;
  selectedInterests: string[];
  availableInterests: { id: string; name: string }[];
  isLoadingInterests: boolean;
  onInterestToggle: (interestName: string) => void;
  goals: string[];
  onGoalsChange: (goals: string[]) => void;
  isPrivate: boolean;
  setIsPrivate: (value: boolean) => void;
  isLoading: boolean;
  onClose: () => void;
  onSave: () => void;
};

export function ProfileEditDialogView({
  avatar,
  following,
  followers,
  displayName,
  setDisplayName,
  bio,
  setBio,
  selectedInterests,
  availableInterests,
  isLoadingInterests,
  onInterestToggle,
  goals,
  onGoalsChange,
  isPrivate,
  setIsPrivate,
  isLoading,
  onClose,
  onSave,
}: ProfileEditDialogViewProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-card p-6 rounded-lg shadow-lg w-[600px] max-w-full text-card-foreground relative max-h-[90vh] overflow-y-auto">
        {/* 閉じるボタン */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
          disabled={isLoading}
        >
          <X className="w-6 h-6" />
        </button>

        {/* タイトル */}
        <h2 className="text-xl font-bold mb-4">プロフィール設定</h2>

        {/* アイコンと名前 */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatar} alt={`${displayName}のアイコン`} />
            <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Input
              className="border border-foreground"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="表示名"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* フォロー情報 */}
        <div className="mt-4 flex justify-between text-sm">
          <div className="flex space-x-4">
            <span className="font-semibold">フォロー中: {following}</span>
            <span className="font-semibold">フォロワー: {followers}</span>
          </div>
        </div>

        {/* 興味カテゴリー */}
        <div className="mt-4">
          <InterestsCategoryDropdown
            availableInterests={availableInterests}
            selectedInterests={selectedInterests}
            onInterestToggle={onInterestToggle}
            isLoading={isLoadingInterests}
          />
        </div>

        {/* 目標 */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-1">学習目標</h3>
          <GoalInputFiled goals={goals} onChange={onGoalsChange} disabled={isLoading} />
        </div>

        {/* 自己紹介 */}
        <ProfileEditTextarea
          title="自己紹介"
          value={bio || ""}
          onChange={setBio}
          placeholder="自己紹介を書いてください"
          disabled={isLoading}
        />

        {/* 公開設定 */}
        <div className="mt-6 flex items-start space-x-3">
          <input
            type="checkbox"
            id="privateProfile"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            className="w-5 h-5 border border-foreground rounded-md cursor-pointer"
            disabled={isLoading}
          />
          <label htmlFor="privateProfile" className="cursor-pointer">
            <p className="font-semibold">プロフィールを非公開にする</p>
            <p className="text-sm text-muted-foreground">
              非公開にすると、フォロワー以外にプロフィールが表示されなくなります
            </p>
          </label>
        </div>

        {/* 保存ボタン */}
        <div className="mt-6 text-right">
          <Button variant="default" onClick={onSave} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 保存中...
              </>
            ) : (
              "保存"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
