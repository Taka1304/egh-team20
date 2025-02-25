import { HashtagSection } from "@/app/_features/ReportPublishSetting/HasttagSection/HashtagSection";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof HashtagSection> = {
  title: "features/HasttagSection",
  component: HashtagSection,
};

export default meta;
type Story = StoryObj<typeof HashtagSection>;

export const Default: Story = {
  args: {
    tags: ["#tag1", "#tag2"],
    onAddTag: fn(),
    onRemoveTag: fn(),
  },
  render: (args) => {
    return <HashtagSection {...args} />;
  },
};
