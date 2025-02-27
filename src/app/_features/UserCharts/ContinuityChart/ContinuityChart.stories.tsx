import ContinuityChart from "@/app/_features/UserCharts/ContinuityChart/ContinuityChart";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ContinuityChart> = {
  title: "features/UserCharts/ContinuityChart",
  component: ContinuityChart,
};

export default meta;
type Story = StoryObj<typeof ContinuityChart>;

export const Default: Story = {
  args: {
    continuityData: [
      { date: "2024-10", days: 20 },
      { date: "2024-11", days: 18 },
      { date: "2024-12", days: 22 },
      { date: "2025-01", days: 15 },
      { date: "2025-02", days: 25 },
      { date: "2021-03", days: 2 },
    ],
  },
};
