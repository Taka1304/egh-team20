import ActionButton from "@/app/_features/ReportCard/ActionButton/ActionButton";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Heart } from "lucide-react";

const meta: Meta<typeof ActionButton> = {
  title: "features/ReportCard/ActionButton",
  component: ActionButton,
};

export default meta;
type Story = StoryObj<typeof ActionButton>;

export const Default: Story = {
  args: {
    icon: Heart,
    label: "いいね",
    count: 10,
    onClick: fn(),
  },
};
