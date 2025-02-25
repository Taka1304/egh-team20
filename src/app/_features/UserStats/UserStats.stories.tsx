import { UserStats } from "@/app/_features/UserStats/UserStats";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserStats> = {
  title: "features/UserStats",
  component: UserStats,
};

export default meta;
type Story = StoryObj<typeof UserStats>;

export const Default: Story = {
  args: {
    user: {
      totalLearningDays: 100,
      totalLearningTime: 1000,
      averageLearningTimePerDay: 10,
      longestStreak: 50,
    },
  },
};
