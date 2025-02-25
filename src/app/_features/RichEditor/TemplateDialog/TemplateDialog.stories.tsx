import TemplateDialog from "@/app/_features/RichEditor/TemplateDialog/TemplateDialog";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof TemplateDialog> = {
  title: "features/RichEditor/TemplateDialog",
  component: TemplateDialog,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof TemplateDialog>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: fn(),
    onSelectTemplate: fn(),
  },
  render: (args) => {
    return <TemplateDialog {...args} />;
  },
};
