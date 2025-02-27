import CalendarHeatMap from "@/app/_features/Heatmap/CalendarHeatMap";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CalendarHeatMap> = {
  title: "features/CalendarHeatMap",
  component: CalendarHeatMap,
};

export default meta;
type Story = StoryObj<typeof CalendarHeatMap>;

export const Default: Story = {
  args: {
    contributions: [
      { date: "2024-01-01", count: 12 },
      { date: "2024-01-15", count: 8 },
      { date: "2024-02-14", count: 15 },
      { date: "2024-03-01", count: 10 },
      { date: "2024-03-20", count: 7 },
      { date: "2024-04-05", count: 9 },
      { date: "2024-05-01", count: 14 },
    ],
  },
  render: (args) => {
    return <CalendarHeatMap {...args} />;
  },
};
