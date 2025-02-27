import UserStatsList from "@/app/_features/Profile/UserStatsList/UserStatsList";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof UserStatsList> = {
  title: "features/UserStatsList",
  component: UserStatsList,
};

export default meta;
type Story = StoryObj<typeof UserStatsList>;

export const Default: Story = {
  args: {
    stats: [
      { value: "100", label: "累計継続日数" },
      { value: "50", label: "投稿数" },
      { value: "200", label: "リアクション数" },
      { value: "10", label: "バッジ取得数" },
    ],
  },
};
