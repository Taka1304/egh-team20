"use client";

import { NotificationModalView } from "@/app/_features/Notification/NotificationView";

type Notification = {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
};

type NotificationModalProps = {
  onClose: () => void;
};

// **📌 ダミーデータ**
const dummyNotifications: Notification[] = [
  {
    id: 1,
    user: {
      name: "こーが",
      avatar: "/user1.jpg",
    },
    message: "あなたのツイートをお気に入りに登録しました。",
    timestamp: "2月22日",
  },
  {
    id: 2,
    user: {
      name: "うみさん",
      avatar: "/user2.jpg",
    },
    message: "あなたのツイートをリツイートしました。",
    timestamp: "2月21日",
  },
  {
    id: 3,
    user: {
      name: "のーとりあす",
      avatar: "/user3.jpg",
    },
    message: "あなたをフォローしました。",
    timestamp: "2月20日",
  },
];

export function NotificationModal({ onClose }: NotificationModalProps) {
  return <NotificationModalView notifications={dummyNotifications} onClose={onClose} />;
}
