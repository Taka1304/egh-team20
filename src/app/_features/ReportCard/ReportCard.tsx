"use client";
import { ReportCardView } from "@/app/_features/ReportCard/ReportCardView";
import { useReaction } from "@/app/hooks/useReaction";
import type { Report } from "@/app/types/reports";
import { useState } from "react";
import { toast } from "sonner";

type ReportCardProps = {
  report: Report;
};

export function ReportCard({ report: initialReport }: ReportCardProps) {
  const [showFullContent, setShowFullContent] = useState(false);
  // 初期のリアクション数は、undefined の可能性を排除するため ?? 0 を利用
  const { reactions, addReaction, removeReaction, isLoading } = useReaction(initialReport.id, {
    LIKE: initialReport.likes ?? 0,
    FLAME: initialReport.flames ?? 0,
    CHECK: initialReport.checks ?? 0,
  });

  // 今回は単純に「押されたら増やす」処理を実装
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

  const hasLiked = reactions.LIKE > (initialReport.likes ?? 0);
  const hasFlamed = reactions.FLAME > (initialReport.flames ?? 0);
  const hasChecked = reactions.CHECK > (initialReport.checks ?? 0);

  // 表示する本文は、showFullContent の状態に応じて省略するなどの処理を入れてもよいです
  const maxLength = 100;
  const isLongContent = initialReport.text.length > maxLength;
  const displayedContent = showFullContent
    ? initialReport.text
    : initialReport.text.slice(0, maxLength) + (isLongContent ? "..." : "");

  return (
    <ReportCardView
      report={initialReport}
      displayedContent={displayedContent}
      shouldShowMoreButton={isLongContent && !showFullContent}
      onShowMore={() => setShowFullContent(true)}
      isExpanded={showFullContent}
      // リアクションボタンの処理
      onLike={() => (hasLiked ? handleRemoveReaction("LIKE") : handleAddReaction("LIKE"))}
      onFlame={() => (hasFlamed ? handleRemoveReaction("FLAME") : handleAddReaction("FLAME"))}
      onCheck={() => (hasChecked ? handleRemoveReaction("CHECK") : handleAddReaction("CHECK"))}
      onComment={() => toast("コメント機能は後日実装予定…")}
      hasLiked={hasLiked}
      hasFlamed={hasFlamed}
      hasChecked={hasChecked}
    />
  );
}
