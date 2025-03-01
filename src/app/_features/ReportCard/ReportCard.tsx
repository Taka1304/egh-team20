"use client";
import { ReportCardView } from "@/app/_features/ReportCard/ReportCardView";
import { ReportDeleteDialog } from "@/app/_features/ReportCard/ReportDeleteDialog/ReportDeleteDialog";
import { useReaction } from "@/app/hooks/useReaction";
import type { Report } from "@/app/types/reports";
import { client } from "@/lib/hono";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type ReportCardProps = {
  report: Report;
  isOwner?: boolean;
  onDeleted?: () => Promise<void>;
};

export function ReportCard({ report, isOwner, onDeleted }: ReportCardProps) {
  const router = useRouter();
  const [showFullContent, setShowFullContent] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { data: session } = useSession();

  // 「続きを読む」ボタン表示のためのロジック
  const contentRef = useRef<HTMLDivElement>(null);
  const [shouldShowMoreButton, setShouldShowMoreButton] = useState(false);
  const contentHeightThreshold = 160; // px 単位の閾値

  // コンテンツの高さを測定し、閾値を超えるかを判断する
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setShouldShowMoreButton(height > contentHeightThreshold);
    }
  }, [contentRef.current, report.text]);

  // 文字数が多い場合も「続きを読む」ボタンを表示
  useEffect(() => {
    const shouldShowMoreByLength = report.text.length > 300;
    setShouldShowMoreButton(shouldShowMoreByLength);
  }, [report.text]);

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

    if (!session) {
      toast.error("リアクションをつけるにはログインが必要です");
      return;
    }

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
  const handleDelete = async () => {
    try {
      const response = await client.api.reports[":id"].$delete({
        param: { id: report.id },
      });

      if (response.ok) {
        toast.success("投稿を削除しました");
        // 必要に応じてページを更新するロジックを追加
        router.refresh();
        if (onDeleted) {
          await onDeleted();
        }
      } else {
        toast.error("削除に失敗しました");
      }
    } catch (error) {
      console.error("削除エラー:", error);
      toast.error("削除処理中にエラーが発生しました");
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <ReportCardView
        report={report}
        isOwner={isOwner}
        onShowMore={() => setShowFullContent(true)}
        isExpanded={showFullContent}
        shouldShowMoreButton={shouldShowMoreButton}
        contentRef={contentRef}
        onLike={() => handleToggleReaction("LIKE")}
        onFlame={() => handleToggleReaction("FLAME")}
        onCheck={() => handleToggleReaction("CHECK")}
        onComment={() => toast("コメント機能は後日実装予定…")}
        onDelete={handleDeleteClick}
        hasLiked={hasLiked}
        hasFlamed={hasFlamed}
        hasChecked={hasChecked}
        likes={likes}
        flames={flames}
        checks={checks}
      />
      <ReportDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title={report.title}
      />
    </>
  );
}
