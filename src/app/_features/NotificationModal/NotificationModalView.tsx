"use client";
import type { NotificationResType } from "@/app/_features/NotificationModal/useNotifications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { NotificationType } from "@prisma/client";
import { motion } from "framer-motion";
import { Award, Bot, Check, Flame, Heart, MessageSquare, UserPlus, X } from "lucide-react";
import { useEffect, useRef } from "react";

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "REACTION_HEART":
      return <Heart className="h-5 w-5 text-red-500" />;
    case "REACTION_FIRE":
      return <Flame className="h-5 w-5 text-red-500" />;
    case "REACTION_CHECK":
      return <Check className="h-5 w-5 text-green-500" />;
    case "BADGE":
      return <Award className="h-5 w-5 text-yellow-500" />;
    case "FOLLOW":
      return <UserPlus className="h-5 w-5 text-blue-500" />;
    case "COMMENT":
      return <MessageSquare className="h-5 w-5 text-green-500" />;
    default:
      return <span />;
  }
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function NotificationModalView({
  notifications,
  markAsRead,
  onClose,
}: {
  notifications: NotificationResType;
  markAsRead: (notificationId: string) => void;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
        className="bg-card p-6 rounded-lg shadow-lg w-[500px] max-w-full text-card-foreground relative max-h-[80vh] overflow-y-auto custom-scrollbar"
      >
        {/* 閉じるボタン */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* モーダルタイトル */}
        <h2 className="text-2xl font-bold mb-6">通知</h2>

        {/* 通知リスト */}
        {notifications.length === 0 ? (
          <p className="text-muted-foreground text-center">通知はありません。</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => markAsRead(notification.id)}
                className="cursor-pointer"
              >
                <div className="flex items-start space-x-4 bg-muted p-4 rounded-lg border border-primary-foreground hover:bg-accent transition-colors">
                  {/* Avatarと未読インジケーター */}
                  <div className="relative flex-shrink-0">
                    {notification.sourceUser?.displayName ? (
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={notification.sourceUser.image ?? undefined}
                          alt={`${notification.sourceUser.displayName}のアイコン`}
                        />
                        <AvatarFallback className="bg-muted text-muted-foreground">
                          {notification.sourceUser.displayName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <Bot className="h-12 w-12" />
                    )}
                    {!notification.isRead && (
                      <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-card" />
                    )}
                  </div>
                  {/* 通知内容 */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {getNotificationIcon(notification.type)}
                      <p className="text-sm font-medium">
                        <span className="font-semibold">{notification.sourceUser?.displayName}</span>{" "}
                        {notification.message}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">{formatDate(notification.createdAt)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
