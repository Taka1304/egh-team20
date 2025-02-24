import type { User } from "@/app/[username]/types";
import { UserBages } from "@/app/_features/userBadges/page";
import { UserStats } from "@/app/_features/userStats/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function page() {
  /*
    モックデータ
    後で、getUserProfileみたいな感じでユーザー情報を取得
  */
  const user: User = {
    username: "yamada-taro",
    displayName: "山田 太郎",
    profileImageUrl: "https://picsum.photos/200",
    bio: "フロントエンドを勉強中のエンジニアです。",
    followersCount: 10,
    followingCount: 5,
    interests: ["React", "Next.js", "TypeScript"],
    goals: ["フルスタックエンジニアになる"],
    badges: [
      { id: "1", name: "初投稿", description: "初めて日報を投稿しました" },
      { id: "2", name: "継続3日", description: "3日間連続で学習記録をつけました" },
    ],
    recentLogs: [
      {
        id: "log-01",
        title: "初めてのNext.js",
        content: "Next.jsを使ってUIを構築してみました。",
        date: "2025-02-20",
        learningTime: 60,
      },
    ],
    learningContributions: [
      { date: "2025-02-20", count: 5 },
      { date: "2025-02-21", count: 3 },
    ],
    totalLearningDays: 10,
    totalLearningTime: 120,
    averageLearningTimePerDay: 12,
    longestStreak: 5,
  };

  if (!user) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            {/* プロフィールカード部分 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user.profileImageUrl} alt={user.displayName} />
                    <AvatarFallback>{user.displayName}</AvatarFallback>
                  </Avatar>
                  <h1 className="mt-4 text-2xl font-bold">{user.displayName}</h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <div className="mt-4 flex space-x-4">
                    <div className="text-center">
                      <p className="font-semibold">{user.followersCount}</p>
                      <p className="text-sm text-muted-foreground">フォロワー</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{user.followingCount}</p>
                      <p className="text-sm text-muted-foreground">フォロー中</p>
                    </div>
                  </div>
                  <Button className="mt-4" variant="outline">
                    プロフィールを編集
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 自己紹介 */}
            <Card>
              <CardHeader>
                <CardTitle>自己紹介</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{user.bio}</p>
              </CardContent>
            </Card>

            {/* 興味分野 */}
            <Card>
              <CardHeader>
                <CardTitle>興味分野</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <UserStats user={user} />
            <UserBages badges={user.badges} />
          </div>
        </div>
      </div>
    </>
  );
}
