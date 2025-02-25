import { PublishHeader } from "@/app/_features/ReportPublishSetting/PublishHeader/PublishHeader";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PublishHeader> = {
  title: "features/ReportPublishSetting/PublishHeader",
  component: PublishHeader,
};

export default meta;
type Story = StoryObj<typeof PublishHeader>;

export const Default: Story = {
  args: {},
};
