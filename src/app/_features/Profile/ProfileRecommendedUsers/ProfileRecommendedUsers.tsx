"use client";

import { ProfileRecommendedUserCard } from "@/app/_features/Profile/ProfileRecommendedUsers/ProfileRecommendedUsersCard/ProfileRecommendedUserCard";
import { useRecommendUser } from "@/app/hooks/useRecommendUser";

export function ProfileRecommendedUsers() {
  const { recommendedUsers, isLoading, error, followUser, unfollowUser } = useRecommendUser();

  /* Todo ローディングアニメーション */
  if (isLoading) {
    return (
      <div className="p-4 border border-primary-foreground bg-card rounded-[var(--radius)] w-full">
        <h2 className="text-lg font-bold text-card-foreground mb-3">おすすめの人</h2>
        <p className="text-muted-foreground">ローディング中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-primary-foreground bg-card rounded-[var(--radius)] w-full">
        <h2 className="text-lg font-bold text-card-foreground mb-3">おすすめの人</h2>
        <p className="text-red-500">エラーが発生しました</p>
      </div>
    );
  }

  return (
    <div className="p-4 border border-primary-foreground bg-card rounded-[var(--radius)] w-full">
      <h2 className="text-lg font-bold text-card-foreground mb-3">おすすめの人</h2>

      {/* 横並びのカードレイアウト */}
      <div className="flex space-x-3 overflow-x-auto pb-2 custom-scrollbar">
        {recommendedUsers.length > 0 ? (
          recommendedUsers.map((user) => (
            <ProfileRecommendedUserCard key={user.id} user={user} onFollow={followUser} onUnfollow={unfollowUser} />
          ))
        ) : (
          <p className="text-muted-foreground">おすすめのユーザーが見つかりませんでした</p>
        )}
      </div>
    </div>
  );
}
