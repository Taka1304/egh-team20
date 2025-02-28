"use client";
import { AIReviewDialog } from "@/app/_features/AIReviewDialog/AIReviewDialog";
import type { AIReviewResult } from "@/app/_features/AIReviewDialog/AIReviewDialog";
import { ReportPublishConfirmDialog } from "@/app/_features/ReportPublishConfirmDialog/ReportPublishConfirmDialog";
import RichEditor from "@/app/_features/RichEditor/RichEditor";
import { useReportEditor } from "@/app/hooks/useReportEditor";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const router = useRouter();
  const params = useParams<{ reportId: string }>();

  const { title, content, isLoading, isSaving, setTitle, setContent, saveDraft, publish, handleAssetsUpload } =
    useReportEditor({ initialDraftId: params.reportId });

  const [isAIReviewDialogOpen, setIsAIReviewDialogOpen] = useState(false);
  const [aiReviewResult, setAIReviewResult] = useState<AIReviewResult | undefined>();

  const handleAIReview = () => {
    setIsAIReviewDialogOpen(true);
    // 仮のAI添削結果をセット
    setAIReviewResult({
      analysisSections: {
        configuration: "タスクの進捗と日常の記録が整理されており、明確です。",
        fulfilling: "ポモドーロ数が多く、集中した作業量が伝わります。",
        comprehensive: [
          "タスクの具体的な課題や解決策を記述すると、成長の記録が深まります。",
          "翌日の予定に目標を加えると、計画性が向上します。",
        ],
      },
      score: 8.0,
      comment: "高い集中力で作業を進めており、継続力が素晴らしいです！",
    });
  };

  // ローディング中は読み込み中の表示
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-sm text-muted-foreground">下書きを読み込んでいます...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 固定ヘッダー */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-card border-b border-border z-50">
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          <Button onClick={() => router.back()}>閉じる</Button>
          <div className="text-sm text-muted-foreground">{content.length} 文字</div>
          <div className="flex items-center gap-2">
            <Button className="bg-card text-foreground border" onClick={saveDraft} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  保存中...
                </>
              ) : (
                <>下書き保存</>
              )}
            </Button>
            <Button className="bg-card text-foreground border" onClick={handleAIReview}>
              <Bot size={20} />
              AI添削
            </Button>
            <ReportPublishConfirmDialog onConfirm={publish} disabled={isSaving} />
          </div>
        </div>
      </header>
      <main className="container mx-auto pt-20 px-4 max-w-3xl">
        <div className="space-y-6">
          <div className="bg-card rounded-lg p-4 border">
            <Input
              type="text"
              placeholder="記事タイトル"
              className="!text-3xl font-bold border-0 px-0 focus-visible:ring-0 text-primary-foreground"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* initialContentに下書きの内容を渡す */}
          <RichEditor onChange={setContent} onAssetsUpload={handleAssetsUpload} initialContent={content} />
        </div>
      </main>
      <AIReviewDialog open={isAIReviewDialogOpen} onOpenChange={setIsAIReviewDialogOpen} result={aiReviewResult} />
    </div>
  );
}
