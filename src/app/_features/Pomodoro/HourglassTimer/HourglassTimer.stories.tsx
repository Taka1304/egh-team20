import { HourglassTimer } from "@/app/_features/Pomodoro/HourglassTimer/HourglassTimer";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof HourglassTimer> = {
  title: "features/Pomodoro/HourglassTimer",
  component: HourglassTimer,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof HourglassTimer>;

export const Default: Story = {
  args: {
    duration: 1500,
    timeLeft: 1500,
    setTimeLeft: fn(),
    isRunning: true,
    onComplete: fn(),
    isBreak: false,
  },
  render: (args) => {
    return <HourglassTimer {...args} />;
  },
};
