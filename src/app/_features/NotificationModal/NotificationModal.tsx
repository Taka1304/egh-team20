"use client";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useState } from "react";

import { NotificationModalView } from "@/app/_features/NotificationModal/NotificationModalView"; // 内部モジュール
import { useNotifications } from "@/app/_features/NotificationModal/useNotifications";

export function NotificationModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { notifications, isLoading, markAsRead } = useNotifications();
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
        {notifications.filter((notification) => !notification.isRead).length > 0 && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-card" />
        )}
      </Button>

      {isOpen && !isLoading && (
        <NotificationModalView notifications={notifications} onClose={handleClose} markAsRead={markAsRead} />
      )}
    </>
  );
}
