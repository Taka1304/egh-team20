import { AIReviewDialog } from "@/app/_features/AIReviewDialog/AIReviewDialog";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AIReviewDialog> = {
  title: "features/ReportPublishSetting/AIReviewDialog",
  component: AIReviewDialog,
};

export default meta;
type Story = StoryObj<typeof AIReviewDialog>;

export const Default: Story = {
  args: {},
};
