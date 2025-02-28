import { AIReviewDialog } from "@/app/_features/AIReviewDialog/AIReviewDialog";
import type { AIReviewResult } from "@/app/_features/AIReviewDialog/AIReviewDialog";
import { ReportPublishConfirmDialog } from "@/app/_features/ReportPublishConfirmDialog/ReportPublishConfirmDialog";
import RichEditor from "@/app/_features/RichEditor/RichEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Loader2 } from "lucide-react";

type ReportEditorViewProps = {
  title: string;
  content: string;
  isAIReviewDialogOpen: boolean;
  aiReviewResult?: AIReviewResult;
  draftId: string | null;
  isSaving: boolean;
  onSetTitle: (title: string) => void;
  onSetContent: (content: string) => void;
  onOpenAIReviewDialog: (open: boolean) => void;
  onSave: (isDraft: boolean) => void;
  onAIReview: () => void;
  onAssetsUpload: (file: File, toastId?: string | number) => Promise<{ url: string } | undefined>;
  onBack: () => void;
};

export function ReportEditorView({
  title,
  content,
  isAIReviewDialogOpen,
  aiReviewResult,
  draftId,
  isSaving,
  onSetTitle,
  onSetContent,
  onOpenAIReviewDialog,
  onSave,
  onAIReview,
  onAssetsUpload,
  onBack,
}: ReportEditorViewProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* 固定ヘッダー */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-card border-b border-border z-50">
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          <Button onClick={onBack}>閉じる</Button>
          <div className="text-sm text-muted-foreground">{content.length} 文字</div>
          <div className="flex items-center gap-2">
            <Button className="bg-card text-foreground border" onClick={() => onSave(true)} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  保存中...
                </>
              ) : (
                <>下書き保存</>
              )}
            </Button>
            <Button
              className="bg-card text-foreground border"
              onClick={onAIReview}
              disabled={!draftId || isSaving}
              title={!draftId ? "AI添削するには先に下書き保存をしてください" : "AI添削を実行する"}
            >
              <Bot size={20} />
              AI添削
            </Button>
            <ReportPublishConfirmDialog onConfirm={() => onSave(false)} disabled={isSaving} />
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
              onChange={(e) => onSetTitle(e.target.value)}
            />
          </div>

          <RichEditor onChange={onSetContent} onAssetsUpload={onAssetsUpload} />
        </div>
      </main>
      <AIReviewDialog open={isAIReviewDialogOpen} onOpenChange={onOpenAIReviewDialog} result={aiReviewResult} />
    </div>
  );
}
