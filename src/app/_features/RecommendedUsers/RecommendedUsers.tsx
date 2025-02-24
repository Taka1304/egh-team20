"use client";

import { RecommendedUserCard } from "@/app/_features/RecommendedUsers/RecommendedUserCard";

type RecommendedUser = {
  id: number;
  name: string;
  handle: string;
  avatar: string;
};

const recommendedUsers: RecommendedUser[] = [
  {
    id: 1,
    name: "タナカ",
    handle: "@tanaka_dev",
    avatar: "/tanaka_avatar.jpg",
  },
  {
    id: 2,
    name: "サトウ",
    handle: "@satou_design",
    avatar: "/satou_avatar.jpg",
  },
  {
    id: 3,
    name: "スズキ",
    handle: "@suzuki_ai",
    avatar: "/suzuki_avatar.jpg",
  },
];

export function RecommendedUsers() {
  return (
    <div className="p-4 border border-border bg-card rounded-[var(--radius)] w-full">
      <h2 className="text-lg font-bold text-card-foreground mb-3">おすすめの人</h2>
      <div className="space-y-3">
        {recommendedUsers.map((user) => (
          <RecommendedUserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
