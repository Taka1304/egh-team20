"use client";

import { TimelineView } from "@/app/_features/TimeLine/TimeLineView";

type Report = {
  id: number;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  image?: string;
  link?: string;
};

// ダミーデータ（APIから取得する想定）
const reports: Report[] = [
  {
    id: 1,
    user: {
      name: "ヤマモト",
      handle: "@yamamotoVn",
      avatar: "/avatar.jpg",
    },
    content: "JPHACKS2024 AWARD DAYの参加記事を書きました！ぜひご覧ください。",
    createdAt: "2024/02/23",
    link: "https://note.com/yamamotokoki/n...",
  },
  {
    id: 2,
    user: {
      name: "ヤマモト",
      handle: "@yamamotoVn",
      avatar: "/avatar.jpg",
    },
    content:
      "今日は新しいプロジェクトの発表！楽しみ！🚀aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    createdAt: "2024/02/22",
  },
];

export function Timeline() {
  return <TimelineView reports={reports} />;
}
