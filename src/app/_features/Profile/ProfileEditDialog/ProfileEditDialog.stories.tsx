import { ProfileEditDialog } from "@/app/_features/Profile/ProfileEditDialog/ProfileEditDialog";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof ProfileEditDialog> = {
  title: "features/Profile/ProfileEditDialog",
  component: ProfileEditDialog,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ProfileEditDialog>;

export const Default: Story = {
  args: {
    profile: {
      name: "",
      age: 20,
      gender: "men",
      avatar: "https://picsum.photos/640/360",
      skills: ["React", "TypeScript"],
      learningGoals: ["React", "TypeScript"],
      bio: "",
      isPublic: true,
      followers: 20,
      following: 100,
    },
    onClose: fn(),
  },
  render: (args) => {
    return <ProfileEditDialog {...args} />;
  },
};
