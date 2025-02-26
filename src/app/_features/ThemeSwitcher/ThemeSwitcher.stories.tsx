import { ThemeSwitcher } from "@/app/_features/ThemeSwitcher/ThemeSwitcher";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ThemeSwitcher> = {
  title: "features/ThemeSwitcher",
  component: ThemeSwitcher,
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {
  args: {},
};
