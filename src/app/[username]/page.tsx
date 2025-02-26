"use client";
import type { User } from "@/app/[username]/types";
import { Header } from "@/app/_features/Navigate/Header/Header";
import { ProfileRecommendedUsers } from "@/app/_features/ProfileRecommendedUsers/ProfileRecommendedUsers";
import { UserStats } from "@/app/_features/UserStats/UserStats";
import { UserBadges } from "@/app/_features/userBadges/UserBadges";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ダミーデータ
const reports = [
  {
    id: 1,
    user: { name: "ヤマモト", handle: "@yamamotoVn", avatar: "/avatar.jpg" },
    content: "JPHACKS2024 AWARD DAYの参加記事を書きました！ぜひご覧ください。",
    createdAt: "2024/02/23",
    link: "https://note.com/yamamotokoki/n...",
  },
];

export default function ProfilePage() {
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
    <div className="flex flex-col h-screen">
      <Header />
      <div className="w-4/5 flex mx-auto flex-col">
        <div className="flex flex-col items-center mt-20 bg-gray-100 py-6">
          <Avatar className="w-32 h-32">
            <AvatarImage src={user.profileImageUrl} alt={user.displayName} />
            <AvatarFallback>{user.displayName}</AvatarFallback>
          </Avatar>
          <h1 className="mt-4 text-3xl font-bold">{user.displayName}</h1>
          <p className="text-muted-foreground">@{user.username}</p>
          <div className="mt-2 flex space-x-4">
            <div className="text-center">
              <p className="font-semibold text-lg">{user.followersCount}</p>
              <p className="text-sm text-muted-foreground">フォロワー</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-lg">{user.followingCount}</p>
              <p className="text-sm text-muted-foreground">フォロー中</p>
            </div>
          </div>
          <Button className="mt-4" variant="outline">
            プロフィールを編集
          </Button>
        </div>

        {/* 右カラム（おすすめユーザー） */}
        <div className="w-full pl-4">
            <ProfileRecommendedUsers />
        </div>

        <div className="flex flex-grow container mx-auto px-4 py-8">
          {/* 左カラム（プロフィール詳細） */}
          <div className="w-1/4 pr-4 space-y-4">
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
            <UserBadges badges={user.badges} />
          </div>

          {/* 中央カラム（投稿一覧） */}
          <div className="w-1/2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>投稿</CardTitle>
              </CardHeader>
              <CardContent>
                {reports.map((report) => (
                  <div key={report.id} className="mb-4 p-4 border rounded-lg shadow-sm">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={report.user.avatar} alt={report.user.name} />
                        <AvatarFallback>{report.user.name}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{report.user.name}</p>
                        <p className="text-sm text-muted-foreground">{report.createdAt}</p>
                      </div>
                    </div>
                    <p className="mt-2">{report.content}</p>
                    {report.link && (
                      <a
                        href={report.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline text-sm mt-2 block"
                      >
                        記事を読む
                      </a>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}