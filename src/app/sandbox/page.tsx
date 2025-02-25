"use client";

import { Header } from "@/app/_features/Navigate/Header/Header";
import { ProfileDialog } from "@/app/_features/ProfileDialog/ProfileDialog";
import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(true); // モーダルを開く状態管理

  // 仮のプロフィールデータ
  const dummyProfile = {
    name: "こーが",
    age: 25,
    gender: "男性",
    avatar: "/user1.jpg",
    skills: ["JavaScript", "React", "TypeScript"],
    learningGoals: ["Next.js", "AI", "データ分析"],
    bio: "フロントエンドエンジニアを目指しています！",
    isPublic: true,
    followers: 100,
    following: 50,
  };

  return (
    <>
      <Header />
      {isOpen && (
        <ProfileDialog
          profile={dummyProfile} // 必須の profile を渡す
          onClose={() => setIsOpen(false)} // モーダルを閉じる処理
        />
      )}
    </>
  );
}
