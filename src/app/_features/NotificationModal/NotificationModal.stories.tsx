import { NotificationModal } from "@/app/_features/NotificationModal/NotificationModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NotificationModal> = {
  title: "features/NotificationModal",
  component: NotificationModal,
};

export default meta;
type Story = StoryObj<typeof NotificationModal>;

export const Default: Story = {
  args: {},
};
