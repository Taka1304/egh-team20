import { useEffect, useState } from "react";

export type NotificationType = "LIKE" | "BADGE" | "FOLLOW" | "COMMENT" | "MENTION";

export type Notification = {
  id: string;
  sourceUser: {
    name: string;
    image: string;
  };
  type: NotificationType;
  message: string;
  createdAt: string;
  isRead: boolean;
};

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);

      try {
        // TODO: 実際のAPIエンドポイントに置き換え
        await new Promise((resolve) => setTimeout(resolve, 500));

        // ダミーデータ（実際のデータ構造に近いもの）
        setNotifications([
          {
            id: "1",
            sourceUser: {
              name: "あぎりさんぽ",
              image: "/user1.jpg",
            },
            type: "LIKE",
            message: "あなたの日報「Next.jsの学習」にいいねしました",
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            isRead: false,
          },
          {
            id: "2",
            sourceUser: {
              name: "システム",
              image: "/badge.jpg",
            },
            type: "BADGE",
            message: "新しいバッジ「7日連続投稿」を獲得しました！",
            createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
            isRead: true,
          },
          {
            id: "3",
            sourceUser: {
              name: "ずんだもんさん",
              image: "https://picsum.photos/200/200",
            },
            type: "FOLLOW",
            message: "あなたをフォローしました",
            createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
            isRead: false,
          },
          {
            id: "4",
            sourceUser: {
              name: "わやわやさん",
              image: "/user2.jpg",
            },
            type: "FOLLOW",
            message: "あなたをフォローしました",
            createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
            isRead: false,
          },
          {
            id: "5",
            sourceUser: {
              name: "わやわや2さん",
              image: "/user2.jpg",
            },
            type: "FOLLOW",
            message: "あなたをフォローしました",
            createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
            isRead: false,
          },
        ]);
      } catch (error) {
        console.error("通知の取得に失敗しました", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId: string) => {
    // TODO: 実際のAPI呼び出しを実装
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    );
  };

  return {
    notifications,
    isLoading,
    markAsRead,
  };
}
