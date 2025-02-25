"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState } from "react";

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

type ProfileModalProps = {
  profile: Profile;
  onClose: () => void;
};

export function ProfileModal({ profile, onClose }: ProfileModalProps) {
  const [editedProfile, setEditedProfile] = useState(profile);

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
            <AvatarImage src={editedProfile.avatar} alt={`${editedProfile.name}のアイコン`} />
            <AvatarFallback>{editedProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Input
              className="border border-foreground"
              value={editedProfile.name}
              onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
              placeholder="名前"
            />
          </div>
        </div>

        {/* フォロー情報 */}
        <div className="mt-4 flex justify-between text-sm">
          <div className="flex space-x-4">
            <span className="font-semibold">フォロー中: {editedProfile.following}</span>
            <span className="font-semibold">フォロワー: {editedProfile.followers}</span>
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
              value={editedProfile.age}
              onChange={(e) =>
                setEditedProfile({
                  ...editedProfile,
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
              value={editedProfile.gender}
              onChange={(e) => setEditedProfile({ ...editedProfile, gender: e.target.value })}
            >
              <option value="男性">男性</option>
              <option value="女性">女性</option>
              <option value="その他">その他</option>
            </select>
          </div>
        </div>

        {/* スキルセット */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">スキルセット</h3>
          <Textarea
            className="border border-foreground"
            value={editedProfile.skills.join(", ")}
            onChange={(e) => setEditedProfile({ ...editedProfile, skills: e.target.value.split(", ") })}
            placeholder="例: JavaScript, React, TypeScript"
          />
        </div>

        {/* 学びたいジャンル・目指す分野 */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">学びたいジャンル・目指す分野</h3>
          <Textarea
            className="border border-foreground"
            value={editedProfile.learningGoals.join(", ")}
            onChange={(e) => setEditedProfile({ ...editedProfile, learningGoals: e.target.value.split(", ") })}
            placeholder="例: Web開発, AI, UXデザイン"
          />
        </div>

        {/* 自己紹介 */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">自己紹介</h3>
          <Textarea
            className="border border-foreground"
            value={editedProfile.bio}
            onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
            placeholder="自己紹介を書いてください"
          />
        </div>

        {/* ポストの非公開設定（チェックボックス） */}
        <div className="mt-6 flex items-start space-x-3">
          <input
            type="checkbox"
            id="privatePost"
            checked={!editedProfile.isPublic}
            onChange={(e) => setEditedProfile({ ...editedProfile, isPublic: !e.target.checked })}
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
