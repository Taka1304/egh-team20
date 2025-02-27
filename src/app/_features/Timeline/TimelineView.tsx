"use client";

import Loading from "@/app/Loading";
import { ReportCard } from "@/app/_features/ReportCard/ReportCard";
import type { ViewMode } from "@/app/_features/Timeline/Timeline";
import type { Report } from "@/app/types/reports";
import { Button } from "@/components/ui/button";
import type { ForwardedRef } from "react";

type TimelineViewProps = {
  reports: Report[];
  loaderRef: ForwardedRef<HTMLDivElement>;
  isLoading: boolean;
  hasMore: boolean;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
};

export function TimelineView({
  reports,
  loaderRef,
  isLoading,
  hasMore,
  viewMode,
  onChangeViewMode,
}: TimelineViewProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* フィルターボタン */}
      <div className="flex justify-between mb-4 p-2 bg-card rounded-md">
        <Button
          variant={viewMode === "category" ? "default" : "outline"}
          onClick={() => onChangeViewMode("category")}
          className="flex-1 mx-1 text-primary-foreground"
        >
          カテゴリー
        </Button>
        <Button
          variant={viewMode === "following" ? "default" : "outline"}
          onClick={() => onChangeViewMode("following")}
          className="flex-1 mx-1 text-primary-foreground"
        >
          フォロー中
        </Button>
        <Button
          variant={viewMode === "mine" ? "default" : "outline"}
          onClick={() => onChangeViewMode("mine")}
          className="flex-1 mx-1 text-primary-foreground"
        >
          自分の投稿
        </Button>
      </div>

      {/* タイムライン表示エリア */}
      <div className="h-[80vh] overflow-y-auto border rounded-md p-2 space-y-4">
        {reports.length > 0 ? (
          reports.map((report) => <ReportCard key={report.id} report={report} />)
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            {!isLoading && <p>表示できる投稿がありません</p>}
          </div>
        )}

        {/* ローダー */}
        <div ref={loaderRef} className="py-4 text-center">
          {isLoading && (
            <div className=" flex items-center justify-center">
              <Loading />
            </div>
          )}
          {!hasMore && reports.length > 0 && <p className="text-muted-foreground">これ以上のレポートはありません</p>}
        </div>
      </div>
    </div>
  );
}
