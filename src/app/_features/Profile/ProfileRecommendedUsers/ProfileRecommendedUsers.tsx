"use client";

import { ProfileRecommendedUserCard } from "@/app/_features/Profile/ProfileRecommendedUsers/ProfileRecommendedUsersCard/ProfileRecommendedUserCard";
import { useGetRecommendedUsers } from "@/app/_features/Profile/ProfileRecommendedUsers/useGetRecommendedUsers";

export function ProfileRecommendedUsers() {
  const { recommendedUsers, isLoading } = useGetRecommendedUsers();

  /* Todo ローディングアニメーション */
  if (isLoading) {
    return <div>ローディング中...</div>;
  }

  return (
    <div className="p-4 border border-primary-foreground bg-card rounded-[var(--radius)] w-full">
      <h2 className="text-lg font-bold text-card-foreground mb-3">おすすめの人</h2>

      {/* 横並びのカードレイアウト */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {recommendedUsers.map((user) => (
          <ProfileRecommendedUserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
