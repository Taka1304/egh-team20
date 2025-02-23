"use client";

import { TweetModalView } from "@/app/_features/Modal/TweetModalView";
import { useState } from "react";

type Tweet = {
  id: number;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  image?: string;
};

type TweetModalProps = {
  onClose: () => void;
};

// **📌 ダミーデータ**
const dummyTweet: Tweet = {
  id: 1,
  user: {
    name: "ヤマモト",
    handle: "@yamamotoVn",
    avatar: "/avatar.jpg",
  },
  content: "2月に刺激を 月間22日目 『僕と仕様と要件定義』",
  createdAt: "2025/2/22",
};

export function TweetModal({ onClose }: TweetModalProps) {
  const [comment, setComment] = useState("");

  return <TweetModalView tweet={dummyTweet} comment={comment} setComment={setComment} onClose={onClose} />;
}
