"use client";
import { ReportCardView } from "@/app/_features/ReportCard/ReportCardView";
import { useReaction } from "@/app/hooks/useReaction";
import type { Report } from "@/app/types/reports";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ReportCardProps = {
  report: Report;
};

export function ReportCard({ report }: ReportCardProps) {
  const [showFullContent, setShowFullContent] = useState(false);

  // useReaction フック
  const { addReaction, removeReaction, isLoading } = useReaction(report.id, {
    LIKE: report.likes ?? 0,
    FLAME: report.flames ?? 0,
    CHECK: report.checks ?? 0,
  });

  // 初期のリアクション状態を管理
  const [hasLiked, setHasLiked] = useState(report.hasLiked ?? false);
  const [hasFlamed, setHasFlamed] = useState(report.hasFlamed ?? false);
  const [hasChecked, setHasChecked] = useState(report.hasChecked ?? false);
  const [likes, setLikes] = useState(report.likes ?? 0);
  const [flames, setFlames] = useState(report.flames ?? 0);
  const [checks, setChecks] = useState(report.checks ?? 0);

  // 🔹 `report` の値が変わったときに `useState` を更新
  useEffect(() => {
    setHasLiked(report.hasLiked ?? false);
    setHasFlamed(report.hasFlamed ?? false);
    setHasChecked(report.hasChecked ?? false);
    setLikes(report.likes ?? 0);
    setFlames(report.flames ?? 0);
    setChecks(report.checks ?? 0);
  }, [report]);

  const handleToggleReaction = async (type: "LIKE" | "FLAME" | "CHECK") => {
    if (isLoading) return;

    let setHasReaction: (value: boolean) => void;
    let setCount: (value: number) => void;
    let currentHasReaction: boolean;
    let count: number;

    switch (type) {
      case "LIKE":
        setHasReaction = setHasLiked;
        setCount = setLikes;
        currentHasReaction = hasLiked;
        count = likes;
        break;
      case "FLAME":
        setHasReaction = setHasFlamed;
        setCount = setFlames;
        currentHasReaction = hasFlamed;
        count = flames;
        break;
      case "CHECK":
        setHasReaction = setHasChecked;
        setCount = setChecks;
        currentHasReaction = hasChecked;
        count = checks;
        break;
      default:
        return;
    }

    // フロント側ですぐに反映
    setHasReaction(!currentHasReaction);
    setCount(currentHasReaction ? count - 1 : count + 1);

    try {
      if (currentHasReaction) {
        await removeReaction(type);
        toast(`「${type}」を取り消しました`);
      } else {
        await addReaction(type);
        toast(`投稿に「${type}」リアクションをつけました`);
      }
    } catch (error) {
      // エラーが発生した場合は状態を元に戻す
      setHasReaction(currentHasReaction);
      setCount(count);
      toast.error("リアクションの更新に失敗しました");
    }
  };

  // 表示する本文の処理

  return (
    <ReportCardView
      report={report}
      onShowMore={() => setShowFullContent(true)}
      isExpanded={showFullContent}
      displayedContent={showFullContent ? report.text : report.text.slice(0, 200)}
      shouldShowMoreButton={report.text.length > 200}
      onLike={() => handleToggleReaction("LIKE")}
      onFlame={() => handleToggleReaction("FLAME")}
      onCheck={() => handleToggleReaction("CHECK")}
      onComment={() => toast("コメント機能は後日実装予定…")}
      hasLiked={hasLiked}
      hasFlamed={hasFlamed}
      hasChecked={hasChecked}
      likes={likes}
      flames={flames}
      checks={checks}
    />
  );
}
