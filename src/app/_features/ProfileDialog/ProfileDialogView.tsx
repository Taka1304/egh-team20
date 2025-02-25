"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { ProfileTextarea } from "./ProfileTextarea";

type ProfileDialogViewProps = {
  avatar: string;
  following: number;
  followers: number;
  name: string;
  setName: (value: string) => void;
  age: number;
  setAge: (value: number) => void;
  gender: string;
  setGender: (value: string) => void;
  skills: string;
  setSkills: (value: string) => void;
  learningGoals: string;
  setLearningGoals: (value: string) => void;
  bio: string;
  setBio: (value: string) => void;
  isPublic: boolean;
  setIsPublic: (value: boolean) => void;
  onClose: () => void;
  onSave: () => void;
};

export function ProfileDialogView({
  avatar,
  following,
  followers,
  name,
  setName,
  age,
  setAge,
  gender,
  setGender,
  skills,
  setSkills,
  learningGoals,
  setLearningGoals,
  bio,
  setBio,
  isPublic,
  setIsPublic,
  onClose,
  onSave,
}: ProfileDialogViewProps) {
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
            <AvatarImage src={avatar} alt={`${name}のアイコン`} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Input
              className="border border-foreground"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="名前"
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

        {/* 年齢・性別を横並び */}
        <div className="mt-4 flex space-x-4">
          {/* 年齢 */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">年齢</h3>
            <Input
              className="w-24 border border-foreground"
              type="number"
              min="0"
              value={age}
              onChange={(e) => setAge(Math.max(0, Number(e.target.value)))}
            />
          </div>

          {/* 性別 */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">性別</h3>
            <select
              className="border border-foreground bg-card text-card-foreground p-2 rounded-md w-40 text-sm"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="男性">男性</option>
              <option value="女性">女性</option>
              <option value="その他">その他</option>
            </select>
          </div>
        </div>

        {/* スキル */}
        <ProfileTextarea
          title="スキルセット"
          value={skills}
          onChange={setSkills}
          placeholder="例: JavaScript, React, TypeScript"
        />
        {/* 学びたいジャンル */}
        <ProfileTextarea
          title="学びたいジャンル・目指す分野"
          value={learningGoals}
          onChange={setLearningGoals}
          placeholder="例: Web開発, AI, UXデザイン"
        />
        {/* 自己紹介 */}
        <ProfileTextarea title="自己紹介" value={bio} onChange={setBio} placeholder="自己紹介を書いてください" />

        {/* 公開設定 */}
        <div className="mt-6 flex items-start space-x-3">
          <input
            type="checkbox"
            id="privatePost"
            checked={!isPublic}
            onChange={(e) => setIsPublic(!e.target.checked)}
            className="w-5 h-5 border border-foreground rounded-md cursor-pointer"
          />
          <label htmlFor="privatePost" className="cursor-pointer">
            <p className="font-semibold">ポストを非公開にする</p>
          </label>
        </div>

        {/* 保存ボタン */}
        <div className="mt-6 text-right">
          <Button variant="default" onClick={onSave}>
            保存
          </Button>
        </div>
      </div>
    </div>
  );
}
