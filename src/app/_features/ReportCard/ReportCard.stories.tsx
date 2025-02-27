import { ReportCard } from "@/app/_features/ReportCard/ReportCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ReportCard> = {
  title: "features/ReportCard",
  component: ReportCard,
};

export default meta;
type Story = StoryObj<typeof ReportCard>;

const text = `## 今日の気分: 😃
## 本日の格言
ああ 良き天気 心安らかなり
日本の夏 蝉の声 いま静かにして
木の下に宿れるなり 我が心
その宿れるなりと同じき 安き心にある
行ってきます!!!

## もくじ
- 1. はじめに
- 2. 本文
- 3. おわりに
`;

export const Default: Story = {
  args: {
    report: {
      id: "1",
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
