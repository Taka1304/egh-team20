import { UserBadges } from "@/app/_features/Profile/userBadges/UserBadges";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserBadges> = {
  title: "features/UserBadges",
  component: UserBadges,
};

export default meta;
type Story = StoryObj<typeof UserBadges>;

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
