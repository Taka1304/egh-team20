"use client";

import type { Report } from "@/app/types/reports";
import { useEffect, useState } from "react";

// API のレスポンス型を定義
type APIResponse = {
  reports: {
    id: string;
    title: string;
    text: string;
    createdAt: string;
    user: {
      id: string;
      displayName?: string | null;
      image?: string | null;
    };
    reactions?: {
      type: { name: "LIKE" | "FLAME" | "CHECK" };
    }[];
  }[];
};

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("/api/reports"); // Hono API にリクエスト送信

        if (!response.ok) {
          console.error("Failed to fetch reports:", await response.text());
          setHasMore(false);
          return;
        }

        const data: APIResponse = await response.json(); // 型を指定

        setReports(
          data.reports.map((r: APIResponse["reports"][number]) => ({
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
            likes: r.reactions?.filter((reaction) => reaction.type.name === "LIKE")?.length || 0,
            flames: r.reactions?.filter((reaction) => reaction.type.name === "FLAME")?.length || 0,
            checks: r.reactions?.filter((reaction) => reaction.type.name === "CHECK")?.length || 0,
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

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    reports,
    isLoading,
    hasMore,
    handleLoadMore,
  };
}
