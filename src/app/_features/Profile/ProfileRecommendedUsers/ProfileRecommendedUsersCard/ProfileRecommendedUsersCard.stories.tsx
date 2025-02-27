import { ProfileRecommendedUserCard } from "@/app/_features/Profile/ProfileRecommendedUsers/ProfileRecommendedUsersCard/ProfileRecommendedUserCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ProfileRecommendedUserCard> = {
  title: "features/ProfileRecommendedUsers/ProfileRecommendedUserCard",
  component: ProfileRecommendedUserCard,
};

export default meta;
type Story = StoryObj<typeof ProfileRecommendedUserCard>;

export const Default: Story = {
  args: {},
};
