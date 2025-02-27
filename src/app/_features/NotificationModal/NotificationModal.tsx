"use client";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useState } from "react";

import { NotificationModalView } from "@/app/_features/NotificationModal/NotificationModalView"; // 内部モジュール

export type Notification = {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
};

// **📌 ダミーデータ**
const dummyNotifications: Notification[] = [
  {
    id: 1,
    user: { name: "こーが", avatar: "/user1.jpg" },
    message: "あなたのツイートをお気に入りに登録しました。",
    timestamp: "2月22日",
  },
  {
    id: 2,
    user: { name: "うみさん", avatar: "/user2.jpg" },
    message: "あなたのツイートをリツイートしました。",
    timestamp: "2月21日",
  },
  {
    id: 3,
    user: { name: "のーとりあす", avatar: "/user3.jpg" },
    message: "あなたをフォローしました。",
    timestamp: "2月20日",
  },
];

export function NotificationModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative w-10 h-10 rounded-full text-primary-foreground"
        onClick={handleOpen}
      >
        <Bell className="h-5 w-5" />
      </Button>

      {isOpen && <NotificationModalView notifications={dummyNotifications} onClose={handleClose} />}
    </>
  );
}
