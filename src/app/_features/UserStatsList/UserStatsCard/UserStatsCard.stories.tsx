import UserStatsCard from "@/app/_features/UserStatsList/UserStatsCard/UserStatsCard";
import type { Meta, StoryObj } from "@storybook/react";
import { Trophy } from "lucide-react";

const meta: Meta<typeof UserStatsCard> = {
  title: "features/UserStats/UserStatsCard",
  component: UserStatsCard,
};

export default meta;
type Story = StoryObj<typeof UserStatsCard>;

export const Default: Story = {
  args: {
    stat: {
      title: "累計継続日数",
      value: "134日",
      icon: Trophy,
      color: "text-yellow-500",
    },
  },
};
