"use client";

import { useGetRecommendedUsers } from "@/app/_features/Profile/ProfileRecommendedUsers/useGetRecommendedUsers";
import { RecommendedUserCard } from "@/app/_features/RecommendedUsers/RecommendedUserCard";

export function RecommendedUsers() {
  const { recommendedUsers, isLoading } = useGetRecommendedUsers();

  if (isLoading) {
    return <div>ローディング中...</div>;
  }

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
