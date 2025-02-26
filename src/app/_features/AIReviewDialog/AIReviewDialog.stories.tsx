import { AIReviewDialog } from "@/app/_features/AIReviewDialog/AIReviewDialog";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof AIReviewDialog> = {
  title: "features/RichEditor/AIReviewDialog",
  component: AIReviewDialog,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AIReviewDialog>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: fn(),
    result: {
      analysisSections: {
        configuration: "タスクの進捗と日常の記録が整理されており、明確です。",
        fulfilling: "ポモドーロ数が多く、集中した作業量が伝わります。",
        comprehensive: [
          "タスクの具体的な課題や解決策を記述すると、成長の記録が深まります。",
          "翌日の予定に目標を加えると、計画性が向上します。",
        ],
      },
      score: 8.0,
      comment: "高い集中力で作業を進めており、継続力が素晴らしいです！",
    },
  },
  render: (args) => {
    return <AIReviewDialog {...args} />;
  },
};
