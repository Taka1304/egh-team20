import ProfileCard from "@/app/_features/Profile/ProfileCard/ProfileCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ProfileCard> = {
  title: "features/Profile/ProfileCard",
  component: ProfileCard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const Default: Story = {
  args: {
    user: {
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
    },
  },
};
