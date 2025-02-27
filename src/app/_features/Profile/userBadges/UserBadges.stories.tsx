import UserBadeges from "@/app/_features/Profile/UserBadges/UserBadges";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserBadeges> = {
  title: "features/UserBadges",
  component: UserBadeges,
};

export default meta;
type Story = StoryObj<typeof UserBadeges>;

export const Default: Story = {
  args: {},
};
