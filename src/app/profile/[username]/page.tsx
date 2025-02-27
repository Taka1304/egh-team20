"use client";

import Header from "@/app/_features/Navigate/Header/Header";
import ProfileCard from "@/app/_features/Profile/ProfileCard/ProfileCard";
import { ProfileRecommendedUsers } from "@/app/_features/Profile/ProfileRecommendedUsers/ProfileRecommendedUsers";
import UserStatsList from "@/app/_features/Profile/UserStatsList/UserStatsList";
import { Timeline } from "@/app/_features/Timeline/Timeline";
import { useUser } from "@/app/hooks/useUser";
import { useUserStats } from "@/app/hooks/useUserStats";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const { user, isLoading, error } = useUser();
  const { stats } = useUserStats(user?.id);

  // ローディング状態の表示
  if (isLoading) {
    return (
      <div className="bg-background">
        <Header />
        <div className="w-4/5 flex mx-auto flex-col items-center justify-center h-64">
          <p>ユーザー情報を読み込み中...</p>
        </div>
      </div>
    );
  }

  // エラー状態の表示
  if (error) {
    return (
      <div className="bg-background">
        <Header />
        <div className="w-4/5 flex mx-auto flex-col items-center justify-center h-64">
          <p className="text-red-500">エラーが発生しました: {error.message}</p>
        </div>
      </div>
    );
  }

  // ユーザーが見つからない場合
  if (!user) {
    return (
      <div className="bg-background">
        <Header />
        <div className="w-4/5 flex mx-auto flex-col items-center justify-center h-64">
          <p>ユーザーが見つかりませんでした</p>
        </div>
      </div>
    );
  }

  // UserInterestからinterests配列に変換
  const interests = user.UserInterest?.map((ui) => ui.interest.name) || [];

  // データが取得できた場合、統計情報を表示用に整形
  const userStats = stats
    ? [
        { value: stats.streakDays.toString(), label: "累計継続日数" },
        { value: stats.postsCount.toString(), label: "投稿数" },
        { value: stats.reactionsCount.toString(), label: "リアクション数" },
        { value: stats.badgesCount.toString(), label: "バッジ取得数" },
      ]
    : [];

  return (
    <div className="bg-background">
      <Header />
      <div className="w-4/5 flex mx-auto flex-col gap-4">
        {/* プロフィールカード */}
        <div className="pl-4">
          <ProfileCard user={user} />
          {/* Todo ユーザーの累計投稿日数を受け取って、グラフとして表示 */}
          {/* <PostsChart postsData={} /> */}
        </div>
        {/* 右カラム（おすすめユーザー） */}
        <div className="w-full pl-4">
          <ProfileRecommendedUsers />
        </div>

        <div className="flex flex-grow container mx-auto px-4 py-8">
          {/* 左カラム（プロフィール詳細） */}
          <div className="w-2/5 pr-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>自己紹介</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{user.bio || "自己紹介文がありません"}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>興味分野</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {interests.length > 0 ? (
                    interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">設定された興味分野はありません</p>
                  )}
                </div>
              </CardContent>
            </Card>
            <UserStatsList stats={userStats} />
          </div>

          {/* 中央カラム（投稿一覧） */}
          <div className="w-3/5">
            <Card>
              <Timeline />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
