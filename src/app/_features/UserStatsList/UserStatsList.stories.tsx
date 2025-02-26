import UserStatsList from "@/app/_features/UserStatsList/UserStatsList";
import type { Meta, StoryObj } from "@storybook/react";
import { Award, Heart, Target, Trophy } from "lucide-react";

const meta: Meta<typeof UserStatsList> = {
  title: "features/UserStatsList",
  component: UserStatsList,
};

export default meta;
type Story = StoryObj<typeof UserStatsList>;

export const Default: Story = {
  args: {
    stats: [
      {
        title: "累計継続日数",
        value: "134日",
        icon: Trophy,
        color: "text-yellow-500",
      },
      {
        title: "投稿数",
        value: "125件",
        icon: Target,
        color: "text-blue-500",
      },
      {
        title: "リアクション数",
        value: "1,000+",
        icon: Heart,
        color: "text-red-500",
      },
      {
        title: "バッジ取得数",
        value: "12個",
        icon: Award,
        color: "text-purple-500",
      },
    ],
  },
};
