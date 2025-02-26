"use client";

import { ReportCard } from "@/app/_features/ReportCard/ReportCard";
import type { Report } from "@/app/types/reports";
import type { ForwardedRef } from "react";

type TimelineViewProps = {
  reports: Report[];
  loaderRef: ForwardedRef<HTMLDivElement>;
  isLoading: boolean;
  hasMore: boolean;
};

export function TimelineView({ reports, loaderRef, isLoading, hasMore }: TimelineViewProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="h-[80vh] overflow-y-auto border rounded-md p-2 space-y-4">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}

        {/* ローダー */}
        <div ref={loaderRef} className="py-4 text-center">
          {isLoading && <p className="text-muted-foreground">読み込み中...</p>}
          {!hasMore && <p className="text-muted-foreground">これ以上のレポートはありません</p>}
        </div>
      </div>
    </div>
  );
}
