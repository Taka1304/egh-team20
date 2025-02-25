import { RecommendedUsers } from "@/app/_features/RecommendedUsers/RecommendedUsers";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RecommendedUsers> = {
  title: "features/RecommendedUsers",
  component: RecommendedUsers,
};

export default meta;
type Story = StoryObj<typeof RecommendedUsers>;

export const Default: Story = {
  args: {},
};
