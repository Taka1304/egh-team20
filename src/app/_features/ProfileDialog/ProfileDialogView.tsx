"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { ProfileTextarea } from "./ProfileTextarea";

type Profile = {
  name: string;
  age: number;
  gender: string;
  avatar: string;
  skills: string[];
  learningGoals: string[];
  bio: string;
  isPublic: boolean;
  followers: number;
  following: number;
};

type ProfileDialogViewProps = {
  profile: Profile;
  onChange: (profile: Profile) => void;
  onClose: () => void;
};

export function ProfileDialogView({ profile, onChange, onClose }: ProfileDialogViewProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-card p-6 rounded-lg shadow-lg w-[600px] max-w-full text-card-foreground relative">
        {/* 閉じるボタン */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        >
          <X className="w-6 h-6" />
        </button>

        {/* タイトル */}
        <h2 className="text-xl font-bold mb-4">プロフィール設定</h2>

        {/* アイコンと名前 */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatar} alt={`${profile.name}のアイコン`} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Input
              className="border border-foreground"
              value={profile.name}
              onChange={(e) => onChange({ ...profile, name: e.target.value })}
              placeholder="名前"
            />
          </div>
        </div>

        {/* フォロー情報 */}
        <div className="mt-4 flex justify-between text-sm">
          <div className="flex space-x-4">
            <span className="font-semibold">フォロー中: {profile.following}</span>
            <span className="font-semibold">フォロワー: {profile.followers}</span>
          </div>
        </div>

        {/* 年齢・性別を横並び */}
        <div className="mt-4 flex space-x-4">
          {/* 年齢 */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">年齢</h3>
            <Input
              className="w-24 border border-foreground"
              type="number"
              min="0"
              value={profile.age}
              onChange={(e) =>
                onChange({
                  ...profile,
                  age: Math.max(0, Number(e.target.value)),
                })
              }
            />
          </div>

          {/* 性別 */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">性別</h3>
            <select
              className="border border-foreground bg-card text-card-foreground p-2 rounded-md w-40 text-sm"
              value={profile.gender}
              onChange={(e) => onChange({ ...profile, gender: e.target.value })}
            >
              <option value="男性">男性</option>
              <option value="女性">女性</option>
              <option value="その他">その他</option>
            </select>
          </div>
        </div>

        {/* ✅ 新コンポーネントを使用 */}
        <ProfileTextarea
          title="スキルセット"
          value={profile.skills.join(", ")}
          placeholder="例: JavaScript, React, TypeScript"
          onChange={(value) => onChange({ ...profile, skills: value.split(", ") })}
        />

        <ProfileTextarea
          title="学びたいジャンル・目指す分野"
          value={profile.learningGoals.join(", ")}
          placeholder="例: Web開発, AI, UXデザイン"
          onChange={(value) => onChange({ ...profile, learningGoals: value.split(", ") })}
        />

        <ProfileTextarea
          title="自己紹介"
          value={profile.bio}
          placeholder="自己紹介を書いてください"
          onChange={(value) => onChange({ ...profile, bio: value })}
        />

        {/* ポストの非公開設定（チェックボックス） */}
        <div className="mt-6 flex items-start space-x-3">
          <input
            type="checkbox"
            id="privatePost"
            checked={!profile.isPublic}
            onChange={(e) => onChange({ ...profile, isPublic: !e.target.checked })}
            className="w-5 h-5 border border-foreground rounded-md cursor-pointer"
          />
          <label htmlFor="privatePost" className="cursor-pointer">
            <p className="font-semibold">ポストを非公開にする</p>
            <p className="text-sm text-muted-foreground">
              オンにすると、ポストと他のアカウント情報があなたをフォローしているアカウントにのみ表示されます。{" "}
              <a
                href="https://help.example.com/private-posts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                詳細はこちら
              </a>
            </p>
          </label>
        </div>

        {/* 保存ボタン */}
        <div className="mt-6 text-right">
          <Button variant="default">保存</Button>
        </div>
      </div>
    </div>
  );
}
