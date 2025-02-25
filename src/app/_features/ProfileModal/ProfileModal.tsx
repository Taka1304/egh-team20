"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
          <div>
            <Input
              value={editedProfile.name}
              onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
              placeholder="名前"
            />
          </div>
        </div>

        {/* 年齢・性別 */}
        <div className="mt-4 flex space-x-4">
          <Input
            type="number"
            value={editedProfile.age}
            onChange={(e) => setEditedProfile({ ...editedProfile, age: Number(e.target.value) })}
            placeholder="年齢"
          />
          <Input
            value={editedProfile.gender}
            onChange={(e) => setEditedProfile({ ...editedProfile, gender: e.target.value })}
            placeholder="性別"
          />
        </div>

        {/* スキルセット */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">スキルセット</h3>
          <Textarea
            value={editedProfile.skills.join(", ")}
            onChange={(e) => setEditedProfile({ ...editedProfile, skills: e.target.value.split(", ") })}
            placeholder="例: JavaScript, React, TypeScript"
          />
        </div>

        {/* 学びたいジャンル・目指す分野 */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">学びたいジャンル・目指す分野</h3>
          <Textarea
            value={editedProfile.learningGoals.join(", ")}
            onChange={(e) => setEditedProfile({ ...editedProfile, learningGoals: e.target.value.split(", ") })}
            placeholder="例: Web開発, AI, UXデザイン"
          />
        </div>

        {/* 自己紹介 */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">自己紹介</h3>
          <Textarea
            value={editedProfile.bio}
            onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
            placeholder="自己紹介を書いてください"
          />
        </div>

        {/* 公開/非公開 */}
        <div className="mt-4 flex items-center justify-between">
          <span>公開プロフィール</span>
          <Switch
            checked={editedProfile.isPublic}
            onCheckedChange={(checked) => setEditedProfile({ ...editedProfile, isPublic: checked })}
          />
        </div>

        {/* フォロー情報 */}
        <div className="mt-4 flex justify-between text-sm">
          <span>フォロー中: {editedProfile.following}</span>
          <span>フォロワー: {editedProfile.followers}</span>
        </div>

        {/* 保存ボタン */}
        <div className="mt-6 text-right">
          <Button variant="default">保存</Button>
        </div>
      </div>
    </div>
  );
}
