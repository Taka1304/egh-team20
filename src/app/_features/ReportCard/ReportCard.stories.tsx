import { ReportCard } from "@/app/_features/ReportCard/ReportCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ReportCard> = {
  title: "features/ReportCard",
  component: ReportCard,
};

export default meta;
type Story = StoryObj<typeof ReportCard>;

const text = `
## aaaaa
- マークダウンの制御難しく無いか？`;

export const Default: Story = {
  args: {
    report: {
      id: 1,
      user: {
        name: "ヤマモト",
        handle: "@yamamotoVn",
        avatar: "/avatar.jpg",
      },
      title: "今日の日報",
      text: text,
      createdAt: "2024/02/23",
    },
  },
};
