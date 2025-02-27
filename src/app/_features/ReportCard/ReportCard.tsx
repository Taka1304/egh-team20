"use client";
import { ReportCardView } from "@/app/_features/ReportCard/ReportCardView";
import { useReaction } from "@/app/hooks/useReaction";
import type { Report } from "@/app/types/reports";
import { useState } from "react";
import { toast } from "sonner";

type ReportCardProps = {
  report: Report;
};

export function ReportCard({ report }: ReportCardProps) {
  const [showFullContent, setShowFullContent] = useState(false);

  // 初期のリアクション数
  const { reactions, addReaction, removeReaction, isLoading } = useReaction(report.id, {
    LIKE: report.likes ?? 0,
    FLAME: report.flames ?? 0,
    CHECK: report.checks ?? 0,
  });

  const handleAddReaction = async (type: "LIKE" | "FLAME" | "CHECK") => {
    if (isLoading) return;
    await addReaction(type);
    toast(`投稿に「${type}」リアクションをつけました`);
  };

  const handleRemoveReaction = async (type: "LIKE" | "FLAME" | "CHECK") => {
    if (isLoading) return;
    await removeReaction(type);
    toast(`「${type}」を取り消しました`);
  };

  // 表示する本文の処理
  const maxLength = 100;
  const isLongContent = report.text.length > maxLength;
  const displayedContent = showFullContent
    ? report.text
    : report.text.slice(0, maxLength) + (isLongContent ? "..." : "");

  return (
    <ReportCardView
      report={report}
      displayedContent={displayedContent}
      shouldShowMoreButton={isLongContent && !showFullContent}
      onShowMore={() => setShowFullContent(true)}
      isExpanded={showFullContent}
      // リアクションボタンの処理
      onLike={() => (report.hasLiked ? handleRemoveReaction("LIKE") : handleAddReaction("LIKE"))}
      onFlame={() => (report.hasFlamed ? handleRemoveReaction("FLAME") : handleAddReaction("FLAME"))}
      onCheck={() => (report.hasChecked ? handleRemoveReaction("CHECK") : handleAddReaction("CHECK"))}
      onComment={() => toast("コメント機能は後日実装予定…")}
      hasLiked={report.hasLiked ?? false}
      hasFlamed={report.hasFlamed ?? false}
      hasChecked={report.hasChecked ?? false}
    />
  );
}
