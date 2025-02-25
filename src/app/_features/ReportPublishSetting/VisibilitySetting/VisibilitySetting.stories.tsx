import { VisibilitySetting } from "@/app/_features/ReportPublishSetting/VisibilitySetting/VisibilitySetting";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof VisibilitySetting> = {
  title: "features/ReportPublishSetting/VisibilitySetting",
  component: VisibilitySetting,
};

export default meta;
type Story = StoryObj<typeof VisibilitySetting>;

export const Default: Story = {
  args: {},
};
