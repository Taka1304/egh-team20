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
    const channel = supabaseClient
      .channel("supabase_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Notification", filter: `userId=eq.${session?.user.id}` },
        (payload) => {
          // ゆるして
          setNotifications((prev) => [payload.new as NotificationResType[0], ...prev]);
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
