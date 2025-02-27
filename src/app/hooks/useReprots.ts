"use client";

import type { Report } from "@/app/types/reports";
import { client } from "@/lib/hono";
import { useEffect, useState } from "react";

type ReactionType = "LIKE" | "FLAME" | "CHECK";

// `name` (LIKE, FLAME, CHECK) を `typeId` に変換するマッピング
const REACTION_TYPE_MAP: Record<string, string> = {
  LIKE: "cm7k363aj0001r0ux0ff4361n",
  FLAME: "cm7n45ua20000ksuxdbbi597c",
  CHECK: "cm7n45ua40001ksux1x3lbq2m",
};

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);

      try {
        // Hono クライアントを使って API を呼び出す
        const response = await client.api.reports.$get({});

        if (!response.ok) {
          console.error("Failed to fetch reports:", await response.text());
          setHasMore(false);
          return;
        }

        const data = await response.json();

        setReports(
          data.reports.map((r) => ({
            id: r.id,
            title: r.title,
            text: r.text,
            createdAt: r.createdAt,
            user: {
              name: r.user.displayName || "Anonymous",
              handle: `@user${r.user.id.substring(0, 5)}`,
              avatar: r.user.image || "/avatar.jpg",
            },
            tags: [],
            // 取得したリアクション `name` を `typeId` に変換する
            likes: r.reactions?.filter((reaction) => reaction.type.id === REACTION_TYPE_MAP.LIKE)?.length || 0,
            flames: r.reactions?.filter((reaction) => reaction.type.id === REACTION_TYPE_MAP.FLAME)?.length || 0,
            checks: r.reactions?.filter((reaction) => reaction.type.id === REACTION_TYPE_MAP.CHECK)?.length || 0,
            comments: 0,
          })),
        );

        setHasMore(data.reports.length === 30);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  return {
    reports,
    isLoading,
    hasMore,
  };
}
