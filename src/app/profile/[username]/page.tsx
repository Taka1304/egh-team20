"use client";

import Header from "@/app/_features/Navigate/Header/Header";
import ProfileCard from "@/app/_features/Profile/ProfileCard/ProfileCard";
import { ProfileRecommendedUsers } from "@/app/_features/Profile/ProfileRecommendedUsers/ProfileRecommendedUsers";

import UserStatsList from "@/app/_features/Profile/UserStatsList/UserStatsList";
import { Timeline } from "@/app/_features/Timeline/Timeline";

import type { User } from "@/app/profile/[username]/types";
import {} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

const stats = [
  { value: "100", label: "累計継続日数" },
  { value: "50", label: "投稿数" },
  { value: "200", label: "リアクション数" },
  { value: "10", label: "バッジ取得数" },
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
            <UserStatsList stats={stats} />
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
