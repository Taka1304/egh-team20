import { AIReviewSetting } from "@/app/_features/ReportPublishSetting/AIReviewSetting/AIReviewSetting";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AIReviewSetting> = {
  title: "features/ReportPublishSetting/AIReviewSetting",
  component: AIReviewSetting,
};

export default meta;
type Story = StoryObj<typeof AIReviewSetting>;

export const Default: Story = {
  args: {},
};
