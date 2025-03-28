import { client } from "@/lib/hono";
import { supabaseClient } from "@/lib/supabaseClient";
import type { InferResponseType } from "hono";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export type NotificationResType = InferResponseType<typeof client.api.notifications.$get, 200>;

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationResType>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUser = async (userId: string) => {
      const user = await client.api.users[":id"].$get({
        param: { id: userId },
      });
      if (!user.ok) {
        return null;
      }
      const userData = await user.json();
      return userData;
    };

    const channel = supabaseClient
      .channel("supabase_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Notification", filter: `userId=eq.${session?.user.id}` },
        (payload: { new: NotificationResType[0] }) => {
          const newNotification = payload.new;
          // 関連ユーザーがある場合、ユーザー情報を取得して通知に追加
          newNotification.sourceUserId
            ? fetchUser(newNotification.sourceUserId).then((user) => {
                setNotifications((prev) => [{ ...newNotification, sourceUser: user }, ...prev]);
              })
            : setNotifications((prev) => [newNotification, ...prev]);
        },
      )
      .subscribe();

    const fetchNotifications = async () => {
      setIsLoading(true);

      try {
        // 初期通知
        const res = await client.api.notifications.$get();
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("通知の取得に失敗しました", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
    return () => {
      channel.unsubscribe();
    };
  }, [session]);

  const markAsRead = async (notificationId: string) => {
    await client.api.notifications[":id"].read.$post({
      param: { id: notificationId },
    });

    setNotifications((prev) =>
      prev.map((notification) => {
        if (notification.id === notificationId) {
          return { ...notification, isRead: true };
        }
        return notification;
      }),
    );
  };

  return {
    notifications,
    isLoading,
    markAsRead,
  };
}
