import { NotificationModal } from "@/app/_features/Notification/Notification";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof NotificationModal> = {
  title: "features/Notification",
  component: NotificationModal,
};

export default meta;
type Story = StoryObj<typeof NotificationModal>;

export const Default: Story = {
  args: {
    onClose: fn(),
  },
  render: (args) => {
    return <NotificationModal {...args} />;
  },
};
