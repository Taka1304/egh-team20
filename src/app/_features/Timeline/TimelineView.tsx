"use client";

import Loading from "@/app/Loading";
import { ReportCard } from "@/app/_features/ReportCard/ReportCard";
import type { ViewMode } from "@/app/_features/Timeline/Timeline";
import type { Report } from "@/app/types/reports";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import type { CSSProperties, ForwardedRef } from "react";

type TimelineViewProps = {
  reports: Report[];
  loaderRef: ForwardedRef<HTMLDivElement>;
  isLoading: boolean;
  hasMore: boolean;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  onReportDeleted?: () => Promise<void>;
  style?: CSSProperties;
  isNested?: boolean;
  userId?: string;
};

export function TimelineView({
  reports,
  loaderRef,
  isLoading,
  hasMore,
  viewMode,
  onChangeViewMode,
  onReportDeleted,
  style,
  isNested,
  userId,
}: TimelineViewProps) {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  // ユーザーIDが指定されている場合は、モード切り替えボタンを表示しない
  const showModeButtons = !userId;

  // シンプルな個別アニメーション設定
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {showModeButtons && (
        <motion.div
          className="flex justify-between mb-4 p-2 bg-card rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
      )}

      <div
        className="overflow-y-auto border rounded-md p-2 space-y-4 custom-scrollbar"
        style={{
          ...style,
          height: "100%",
        }}
      >
        {userId && <div className="text-lg font-semibold p-2 border-b">投稿一覧</div>}
        {/* ローディング中は中央に表示 */}
        {isLoading ? (
          <motion.div className="flex items-center justify-center h-full" {...fadeIn}>
            <Loading />
          </motion.div>
        ) : reports.length > 0 ? (
          <div className="space-y-4">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                  delay: Math.min(index * 0.05, 0.5),
                }}
              >
                <ReportCard report={report} isOwner={currentUserId === report.user.id} onDeleted={onReportDeleted} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div className="text-center py-8 text-muted-foreground" {...fadeIn}>
            <p>表示できる投稿がありません</p>
          </motion.div>
        )}

        {/* ローダー（無限スクロール用）*/}
        {!isLoading && (
          <div ref={loaderRef} className="py-4 text-center">
            {!hasMore && reports.length > 0 && <p className="text-muted-foreground">これ以上のレポートはありません</p>}
          </div>
        )}
      </div>
    </div>
  );
}
