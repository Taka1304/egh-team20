import { Timeline } from "@/app/_features/Timeline/TimeLine";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Timeline> = {
  title: "features/Timeline",
  component: Timeline,
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  args: {
    badges: [
      {
        id: "1",
        name: "お前たちのやってる事は全部お見通しだ！",
        description: "山田奈緒子",
      },
      {
        id: "2",
        name: "なぜベストを尽くさないのか？",
        description: "上田次郎",
      },
    ],
  },
};
