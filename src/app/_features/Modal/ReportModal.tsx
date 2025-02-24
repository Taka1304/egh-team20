"use client";

import { ReportModalView } from "@/app/_features/Modal/ReportModalView";
import { useState } from "react";

type Reply = {
  id: number;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
};

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
  replies?: Reply[];
};

// **📌 ダミーデータ**
const dummyReport: Report = {
  id: 1,
  user: {
    name: "ヤマモト",
    handle: "@yamamotoVn",
    avatar: "/avatar.jpg",
  },
  content: "2月に刺激を 月間22日目 『僕と仕様と要件定義』",
  createdAt: "2025-02-22", // ✅ ISOフォーマット
  replies: [
    {
      id: 101,
      user: {
        name: "タナカ",
        handle: "@tanakaDev",
        avatar: "/tanaka.jpg",
      },
      content: "素晴らしい記事ですね！とても参考になりました👏",
      createdAt: "2025-02-23",
    },
  ],
};

export function ReportModal({ onClose }: { onClose: () => void }) {
  const [comment, setComment] = useState("");

  return <ReportModalView report={dummyReport} comment={comment} setComment={setComment} onClose={onClose} />;
}
