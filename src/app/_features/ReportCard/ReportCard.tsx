"use client";
import { ReportCardView } from "@/app/_features/ReportCard/ReportCardView";
import type { Report } from "@/app/types/reports";
import { useState } from "react";
import { toast } from "sonner";

type ReportCardProps = {
  report: Report;
};

export function ReportCard({ report: initialReport }: ReportCardProps) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [report, setReport] = useState(initialReport);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasFlamed, setHasFlamed] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const toggleReaction = (reaction: "like" | "flame" | "check") => {
    const newReport = { ...report };

    if (reaction === "like") {
      // 押されていなければ +1, 押されていれば -1
      newReport.likes = hasLiked ? Math.max(0, (newReport.likes || 0) - 1) : (newReport.likes || 0) + 1;
      setHasLiked(!hasLiked);
      toast(hasLiked ? "いいねを取り消しました" : "投稿にいいねリアクションをつけました");
    }

    if (reaction === "flame") {
      // 押されていなければ +1, 押されていれば -1
      newReport.flames = hasFlamed ? Math.max(0, (newReport.flames || 0) - 1) : (newReport.flames || 0) + 1;
      setHasFlamed(!hasFlamed);
      toast(hasFlamed ? "ファイト!を取り消しました" : "投稿にファイト!リアクションをつけました");
    }

    if (reaction === "check") {
      // 押されていなければ +1, 押されていれば -1
      newReport.checks = hasChecked ? Math.max(0, (newReport.checks || 0) - 1) : (newReport.checks || 0) + 1;
      setHasChecked(!hasChecked);
      toast(hasChecked ? "チェックを取り消しました" : "投稿をチェックリアクションをつけました");
    }

    setReport(newReport);
  };

  // コメントボタンを押したときの処理
  const handleComment = () => {
    toast("コメント機能は後日実装予定…");
  };

  const maxLength = 100;
  const isLongContent = report.text.length > maxLength;
  const displayedContent = showFullContent ? report.text : report.text;

  return (
    <ReportCardView
      report={report}
      displayedContent={displayedContent}
      shouldShowMoreButton={isLongContent && !showFullContent}
      onShowMore={() => setShowFullContent(true)}
      isExpanded={showFullContent}
      onLike={() => toggleReaction("like")}
      onFlame={() => toggleReaction("flame")}
      onCheck={() => toggleReaction("check")}
      onComment={handleComment}
      hasLiked={hasLiked}
      hasFlamed={hasFlamed}
      hasChecked={hasChecked}
    />
  );
}
