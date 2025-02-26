import { OnboardingDialog } from "@/app/_features/OnboardingDialog/OnboardingDialog";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof OnboardingDialog> = {
  title: "features/OnboardingDialog",
  component: OnboardingDialog,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof OnboardingDialog>;

export const Default: Story = {
  args: {
    onClose: fn(),
  },
  render: (args) => {
    return <OnboardingDialog {...args} />;
  },
};
