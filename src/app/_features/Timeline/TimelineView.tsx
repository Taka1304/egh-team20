"use client";

import Loading from "@/app/Loading";
import { ReportCard } from "@/app/_features/ReportCard/ReportCard";
import type { ViewMode } from "@/app/_features/Timeline/Timeline";
import type { Report } from "@/app/types/reports";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const reportVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* フィルターボタン */}
      <motion.div
        className="flex justify-between mb-4 p-2 bg-card rounded-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
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
      </motion.div>

      {/* タイムライン表示エリア */}
      <div className="h-[80vh] overflow-y-auto border rounded-md p-2 space-y-4 custom-scrollbar">
        {/* ローディング中は中央に表示 */}
        {isLoading ? (
          <motion.div
            className="flex items-center justify-center h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Loading />
          </motion.div>
        ) : reports.length > 0 ? (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
            {reports.map((report, index) => (
              <motion.div key={report.id} variants={reportVariants} custom={index}>
                <ReportCard report={report} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-8 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p>表示できる投稿がありません</p>
          </motion.div>
        )}

        {/* ローダー（無限スクロール用）*/}
        {!isLoading && (
          <motion.div
            ref={loaderRef}
            className="py-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            {!hasMore && reports.length > 0 && <p className="text-muted-foreground">これ以上のレポートはありません</p>}
          </motion.div>
        )}
      </div>
    </div>
  );
}
