import { ProfileRecommendedUsers } from "@/app/_features/Profile/ProfileRecommendedUsers/ProfileRecommendedUsers";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ProfileRecommendedUsers> = {
  title: "features/ProfileRecommendedUsers",
  component: ProfileRecommendedUsers,
};

export default meta;
type Story = StoryObj<typeof ProfileRecommendedUsers>;

export const Default: Story = {
  args: {},
};
