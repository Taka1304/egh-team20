"use client";

import type { Notification } from "@/app/_features/NotificationModal/NotificationModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";

export function NotificationModalView({
  notifications,
  onClose,
}: {
  notifications: Notification[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-card p-6 rounded-lg shadow-lg w-[500px] max-w-full text-card-foreground relative">
        {/* 閉じるボタン */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        >
          <X className="w-6 h-6" />
        </button>

        {/* モーダルタイトル */}
        <h2 className="text-xl font-bold mb-4">通知</h2>

        {/* 通知リスト */}
        {notifications.length === 0 ? (
          <p className="text-muted-foreground text-center">通知はありません。</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div key={notification.id}>
                <div className="flex items-center space-x-3 bg-muted p-3 rounded-lg border border-border">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={notification.user.avatar} alt={`${notification.user.name}のアイコン`} />
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      {notification.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold">{notification.user.name}</span> {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                  </div>
                </div>

                {/* 区切り線: 最後の要素には表示しない */}
                {index !== notifications.length - 1 && <div className="border-t border-border mt-4 pt-4" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
