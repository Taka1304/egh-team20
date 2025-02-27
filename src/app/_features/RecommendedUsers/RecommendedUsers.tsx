"use client";

import { RecommendedUserCard } from "@/app/_features/RecommendedUsers/RecommendedUserCard";
import { useRecommendUser } from "@/app/hooks/useRecommendUser";

export function RecommendedUsers() {
  const { recommendedUsers, isLoading, error, followUser, unfollowUser } = useRecommendUser();

  if (isLoading) {
    return (
      <div className="p-4 border border-border bg-card rounded-[var(--radius)] w-full">
        <h2 className="text-lg font-bold text-card-foreground mb-3">おすすめの人</h2>
        <p className="text-muted-foreground">ユーザーを読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-border bg-card rounded-[var(--radius)] w-full">
        <h2 className="text-lg font-bold text-card-foreground mb-3">おすすめの人</h2>
        <p className="text-red-500">エラーが発生しました: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-4 border border-border bg-card rounded-[var(--radius)] w-full">
      <h2 className="text-lg font-bold text-card-foreground mb-3">おすすめの人</h2>
      {recommendedUsers.length > 0 ? (
        <div className="space-y-3">
          {recommendedUsers.map((user) => (
            <RecommendedUserCard key={user.id} user={user} onFollow={followUser} onUnfollow={unfollowUser} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">おすすめのユーザーがありません</p>
      )}
    </div>
  );
}
