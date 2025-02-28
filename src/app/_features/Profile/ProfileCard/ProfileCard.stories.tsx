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

const mockUser = {
  id: "user123",
  name: "山田太郎",
  email: "yamada.taro@example.com",
  displayName: "Taro Yamada",
  image: "https://i.pravatar.cc/300",
  bio: "プログラミングとデザインが好きです。日々の学びを共有していきます！",
  isPrivate: false,
  followerCount: 124,
  followingCount: 98,
  goals: [
    {
      id: "goal1",
      isPublic: true,
      text: "Reactの基礎を学ぶ",
    },
    {
      id: "goal2",
      isPublic: true,
      text: "TypeScriptをマスターする",
    },
  ],
  UserInterest: [
    { interest: { id: "cm7p0duh300002wux3dbx9h1q", name: "プログラミング" } },
    { interest: { id: "cm7p0duh500022wuxbfa61eor", name: "UI/UXデザイン" } },
    { interest: { id: "cm7p0duh500022wuxbfa61eor", name: "AI" } },
  ],
};

export const Default: Story = {
  args: {
    user: mockUser,
  },
};
