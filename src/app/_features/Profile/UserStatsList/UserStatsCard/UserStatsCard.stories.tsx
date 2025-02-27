import UserStatsCard from "@/app/_features/Profile/UserStatsList/UserStatsCard/UserStatsCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserStatsCard> = {
  title: "features/UserStats/UserStatsCard",
  component: UserStatsCard,
};

export default meta;
type Story = StoryObj<typeof UserStatsCard>;

export const Default: Story = {
  args: {
    stat: {
      value: "100",
      label: "累計継続日数",
    },
  },
};
