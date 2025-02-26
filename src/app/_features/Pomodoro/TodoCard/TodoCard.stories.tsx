import TodoCard from "@/app/_features/Pomodoro/TodoCard/TodoCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TodoCard> = {
  title: "features/Pomodoro/TodoCard",
  component: TodoCard,
};

export default meta;
type Story = StoryObj<typeof TodoCard>;

export const Default: Story = {
  args: {},
};
