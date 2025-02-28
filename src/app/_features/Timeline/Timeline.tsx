"use client";

import { TimelineView } from "@/app/_features/Timeline/TimelineView";
import { useReports } from "@/app/hooks/useReprots";
import { useEffect, useRef, useState } from "react";

export type ViewMode = "category" | "following" | "mine";

export function Timeline({ isNested = false }) {
  const [viewMode, setViewMode] = useState<ViewMode>("category");
  // ローディング状態を個別に管理
  const [isChangingMode, setIsChangingMode] = useState(false);
  const { reports, isLoading, hasMore, refetchReports } = useReports(viewMode);

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

  // データロード状態の監視
  useEffect(() => {
    if (!isLoading) {
      setIsChangingMode(false);
    }
  }, [isLoading]);

  // 表示モード切り替え
  const handleChangeViewMode = (mode: ViewMode) => {
    if (mode !== viewMode) {
      setIsChangingMode(true);
      setViewMode(mode);
    }
  };

  const combinedIsLoading = isLoading || isChangingMode;

  return (
    <TimelineView
      reports={reports}
      loaderRef={loaderRef}
      isLoading={combinedIsLoading}
      hasMore={hasMore}
      viewMode={viewMode}
      onChangeViewMode={handleChangeViewMode}
      onReportDeleted={refetchReports}
      isNested={isNested}
    />
  );
}
