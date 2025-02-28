import { Timeline } from "@/app/_features/Timeline/Timeline";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Timeline> = {
  title: "features/Timeline",
  component: Timeline,
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  args: {},
};
