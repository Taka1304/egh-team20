"use client";
import type { User } from "@/app/[username]/types";
import { UserBages } from "@/app/_features/userBadges/page";
import { TimelineView } from "@/app/_features/TimeLine/TimeLineView";
import { UserStats } from "@/app/_features/userStats/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/app/_features/Navigate/Header/Header";

// ダミーデータ（APIから取得する想定）
const reports = [
  {
    id: 1,
    user: { name: "ヤマモト", handle: "@yamamotoVn", avatar: "/avatar.jpg" },
    content: "JPHACKS2024 AWARD DAYの参加記事を書きました！ぜひご覧ください。",
    createdAt: "2024/02/23",
    link: "https://note.com/yamamotokoki/n...",
  },
  {
    id: 2,
    user: { name: "ヤマモト", handle: "@yamamotoVn", avatar: "/avatar.jpg" },
    content:
      "今日は新しいプロジェクトの発表！楽しみ！🚀aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    createdAt: "2024/02/22",
  },
  {
    id: 3,
    user: { name: "ヤマモト", handle: "@yamamotoVn", avatar: "/avatar.jpg" },
    content: "JPHACKS2024 AWARD DAYの参加記事を書きました！ぜひご覧ください。",
    createdAt: "2024/02/23",
    link: "https://note.com/yamamotokoki/n...",
  },
  {
    id: 4,
    user: { name: "ヤマモト", handle: "@yamamotoVn", avatar: "/avatar.jpg" },
    content: "JPHACKS2024 AWARD DAYの参加記事を書きました！ぜひご覧ください。",
    createdAt: "2024/02/23",
    link: "https://note.com/yamamotokoki/n...",
  },
  {
    id: 5,
    user: { name: "ヤマモト", handle: "@yamamotoVn", avatar: "/avatar.jpg" },
    content: "JPHACKS2024 AWARD DAYの参加記事を書きました！ぜひご覧ください。",
    createdAt: "2024/02/23",
    link: "https://note.com/yamamotokoki/n...",
  },
];

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

  return (
    <div className="container mx-auto px-4 h-screen flex py-8 mt-10">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full">
        {/* 左側のプロフィール情報（スクロール可 / スクロールバー非表示） */}
        <div className="md:col-span-1 space-y-1 h-full overflow-y-auto hidden-scrollbar">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="flex gap-4">
                  <div>
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={user.profileImageUrl} alt={user.displayName} />
                      <AvatarFallback>{user.displayName}</AvatarFallback>
                    </Avatar>
                    <div className="mt-4 items-center space-x-2">
                      <h1 className="mt-4 text-2xl font-bold">{user.displayName}</h1>
                      <p className="text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end gap-4">
                    <div className="mt-4 flex space-x-4">
                      <div className="text-center">
                        <p className="font-semibold text-xl">{user.followersCount}</p>
                        <p className="text-sm text-muted-foreground">フォロワー</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-xl">{user.followingCount}</p>
                        <p className="text-sm text-muted-foreground">フォロー中</p>
                      </div>
                    </div>
                    <Button className="mt-4" variant="outline">
                      プロフィールを編集
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>自己紹介</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{user.bio}</p>
            </CardContent>
          </Card>

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

        {/* 中央のタイムライン（スクロール可 / スクロールバー非表示） */}
        <div className="w-full flex justify-center h-full overflow-y-auto hidden-scrollbar">
          <div className="w-full max-w-2xl">
            <TimelineView reports={reports} />
          </div>
        </div>
      </div>
    </div>
  );
}
