import PostsChart from "@/app/_features/Profile/UserCharts/PostsChart/PostsChart";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PostsChart> = {
  title: "features/UserCharts/PostsChart",
  component: PostsChart,
};

export default meta;
type Story = StoryObj<typeof PostsChart>;

export const Default: Story = {
  args: {
    postsData: [
      { month: "2024-10", count: 20 },
      { month: "2024-11", count: 22 },
      { month: "2024-12", count: 22 },
      { month: "2025-01", count: 15 },
      { month: "2025-02", count: 25 },
    ],
  },
};
