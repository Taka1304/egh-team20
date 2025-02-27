import ReactionChart from "@/app/_features/UserCharts/ReactionChart/ReactionChart";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ReactionChart> = {
  title: "features/UserCharts/ReactionChart",
  component: ReactionChart,
};

export default meta;
type Story = StoryObj<typeof ReactionChart>;

export const Default: Story = {
  args: {
    reactionData: [
      { name: "😇", value: 400 },
      { name: "🤢", value: 300 },
      { name: "🫶", value: 200 },
    ],
  },
};
