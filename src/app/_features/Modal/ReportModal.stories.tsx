import { ReportModal } from "@/app/_features/Modal/ReportModal";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof ReportModal> = {
  title: "features/ReportModal",
  component: ReportModal,
};

export default meta;
type Story = StoryObj<typeof ReportModal>;

export const Default: Story = {
  args: {
    onClose: fn(),
  },
  render: (args) => {
    return <ReportModal {...args} />;
  },
};
