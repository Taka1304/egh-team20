"use client";

import { TimelineView } from "@/app/_features/Timeline/TimelineView";
import { useReports } from "@/app/hooks/useReprots";
import { useEffect, useRef, useState } from "react";

export type ViewMode = "category" | "following" | "mine";

export function Timeline() {
  // 表示モードの状態管理
  const [viewMode, setViewMode] = useState<ViewMode>("category");
  const { reports, isLoading, hasMore } = useReports();

  // 監視対象の要素
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // IntersectionObserverを設定
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      // ローダー要素が可視範囲に入ったら次のページを読み込む
      if (entry.isIntersecting) {
        // handleLoadMore();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // 表示モード切り替え
  const handleChangeViewMode = (mode: ViewMode) => {
    setViewMode(mode);
  };

  return (
    <TimelineView
      reports={reports}
      loaderRef={loaderRef}
      isLoading={isLoading}
      hasMore={hasMore}
      viewMode={viewMode}
      onChangeViewMode={handleChangeViewMode}
    />
  );
}
