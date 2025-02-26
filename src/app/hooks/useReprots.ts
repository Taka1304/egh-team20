"use client";

import type { Report } from "@/app/types/reports";
import { useEffect, useState } from "react";

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);

      // ダミーAPIを模擬: 700ms 遅延
      await new Promise((resolve) => setTimeout(resolve, 700));

      // 1ページあたり5件追加
      const newReports: Report[] = Array.from({ length: 5 }).map((_, i) => {
        const idNumber = (page - 1) * 5 + i + 1;
        return {
          id: `report-${idNumber}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: `サンプルレポート #${idNumber}`,
          text: `## 今日の気分: 😃

- ダミーの内容です
- 現在のページ: ${page}
- レポート番号: ${idNumber}
`,
          createdAt: new Date().toISOString(),
          user: {
            name: `User${idNumber}`,
            handle: `@user${idNumber}`,
            avatar: "/avatar.jpg",
          },
          tags: ["Next.js", "React", "TailwindCSS"],
          likes: 0,
          flames: 0,
          checks: 0,
          comments: 0,
        };
      });

      setReports((prev) => [...prev, ...newReports]);

      // 10ページ(=50件)超えたら終了
      if (page >= 10) {
        setHasMore(false);
      }

      setIsLoading(false);
    };

    fetchReports();
  }, [page]);

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
