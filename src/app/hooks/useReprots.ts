"use client";

import type { ViewMode } from "@/app/_features/Timeline/Timeline";
import type { Report } from "@/app/types/reports";
import { client } from "@/lib/hono";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

// `name` (LIKE, FLAME, CHECK) を `typeId` に変換するマッピング
const REACTION_TYPE_MAP: Record<string, string> = {
  LIKE: "cm7k363aj0001r0ux0ff4361n",
  FLAME: "cm7n45ua20000ksuxdbbi597c",
  CHECK: "cm7n45ua40001ksux1x3lbq2m",
};

// ViewMode を API のクエリパラメータにマッピング
const VIEW_MODE_TO_API_TYPE: Record<ViewMode, "sameCategory" | "following" | "own"> = {
  category: "sameCategory",
  following: "following",
  mine: "own",
};

export function useReports(viewMode: ViewMode = "category") {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const refetchReports = useCallback(async () => {
    setIsLoading(true);

    try {
      // ViewMode に応じた type パラメータを設定
      const type = VIEW_MODE_TO_API_TYPE[viewMode];

      const response = await client.api.reports.$get({
        query: { type },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to fetch reports:", errorText);

        // 404エラーの場合は明示的に空配列を設定
        setReports([]);
        setHasMore(false);
        return;
      }

      const data = await response.json();
      // biome-ignore lint/suspicious/noConsoleLog: <explanation>
      console.log(`Received ${data.reports?.length || 0} reports`);

      setReports(
        data.reports.map((r) => ({
          id: r.id,
          title: r.title,
          text: r.text,
          createdAt: r.createdAt,
          user: {
            id: r.user.id,
            name: r.user.displayName || "Anonymous",
            handle: `@user${r.user.id.substring(0, 5)}`,
            avatar: r.user.image || "/avatar.jpg",
          },
          tags: [],
          likes: r.reactions?.filter((reaction) => reaction.type.id === REACTION_TYPE_MAP.LIKE)?.length || 0,
          flames: r.reactions?.filter((reaction) => reaction.type.id === REACTION_TYPE_MAP.FLAME)?.length || 0,
          checks: r.reactions?.filter((reaction) => reaction.type.id === REACTION_TYPE_MAP.CHECK)?.length || 0,

          hasLiked:
            r.reactions?.some(
              (reaction) => reaction.type.id === REACTION_TYPE_MAP.LIKE && reaction.user.id === currentUserId,
            ) || false,
          hasFlamed:
            r.reactions?.some(
              (reaction) => reaction.type.id === REACTION_TYPE_MAP.FLAME && reaction.user.id === currentUserId,
            ) || false,
          hasChecked:
            r.reactions?.some(
              (reaction) => reaction.type.id === REACTION_TYPE_MAP.CHECK && reaction.user.id === currentUserId,
            ) || false,

          comments: 0,
        })),
      );

      setHasMore(data.reports.length === 30);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setHasMore(false);
      // エラー時は空の配列をセット
      setReports([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentUserId, viewMode]);

  useEffect(() => {
    refetchReports();
  }, [refetchReports]);

  return {
    reports,
    isLoading,
    hasMore,
    refetchReports,
  };
}
