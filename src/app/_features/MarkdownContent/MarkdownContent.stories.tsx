import MarkdownContent from "@/app/_features/MarkdownContent/MarkdownContent";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MarkdownContent> = {
  title: "features/MarkdownContent",
  component: MarkdownContent,
};

export default meta;
type Story = StoryObj<typeof MarkdownContent>;

export const Default: Story = {
  args: {
    content: "# Hello, world!",
  },
  render: (args) => {
    return <MarkdownContent {...args} />;
  },
};
