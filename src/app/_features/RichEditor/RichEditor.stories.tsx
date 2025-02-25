import RichEditor from "@/app/_features/RichEditor/RichEditor";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof RichEditor> = {
  title: "features/RichEditor",
  component: RichEditor,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof RichEditor>;

export const Default: Story = {
  args: {
    onChange: fn(),
    initialContent: "",
  },
  render: (args) => {
    return <RichEditor {...args} />;
  },
};
