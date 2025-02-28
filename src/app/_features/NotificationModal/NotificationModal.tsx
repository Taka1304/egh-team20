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
      </Button>

      {isOpen && !isLoading && (
        <NotificationModalView notifications={notifications} onClose={handleClose} markAsRead={markAsRead} />
      )}
    </>
  );
}
