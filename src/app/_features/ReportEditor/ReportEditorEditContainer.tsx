"use client";
import type { AIReviewResult } from "@/app/_features/AIReviewDialog/AIReviewDialog";
import { client } from "@/lib/hono";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ReportEditorView } from "./ReportEditorView";

type ReportEditorEditContainerProps = {
  reportId: string;
};

export default function ReportEditorEditContainer({ reportId }: ReportEditorEditContainerProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAIReviewDialogOpen, setIsAIReviewDialogOpen] = useState(false);
  const [aiReviewResult, setAIReviewResult] = useState<AIReviewResult | undefined>();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 初期データの読み込み
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await client.api.reports[":id"].$get({
          param: { id: reportId },
        });

        if (result.ok) {
          const { report } = await result.json();
          setTitle(report.title);
          setContent(report.text);
        } else {
          toast.error("レポートの取得に失敗しました");
          router.push("/");
        }
      } catch (error) {
        console.error("レポート取得エラー:", error);
        toast.error("レポートの読み込み中にエラーが発生しました");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [reportId, router]);

  const handleAssetsUpload = async (file: File, toastId?: string | number) => {
    if (!file) return;
    if (file.size > 1024 * 1024 * 5) {
      toast.error("ファイルサイズが5MBを超えています", { id: toastId });
      return;
    }
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      toast.error("このファイルの形式はサポートされていません", { id: toastId });
      return;
    }

    const res = await client.api.assets.upload.$post({
      form: {
        type: "report",
        file,
      },
    });

    if (res.status === 200) {
      return res.json();
    }
    toast.error("アップロードに失敗しました", { id: toastId });
    return;
  };

  const handleSave = async (isDraft: boolean) => {
    setIsSaving(true);
    const toastId = toast.loading("保存しています...");

    try {
      const result = await client.api.reports[":id"].$put({
        param: { id: reportId },
        json: {
          title,
          text: content,
          visibility: isDraft ? "PRIVATE" : "PUBLIC",
          pomodoroCount: 0,
          learningTime: 0,
        },
      });

      if (result.ok) {
        toast.success("保存しました", { id: toastId });
        if (!isDraft) {
          router.push("/");
        }
      } else {
        toast.error("保存に失敗しました", { id: toastId });
      }
    } catch (error) {
      console.error("保存エラー:", error);
      toast.error("保存中にエラーが発生しました", { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAIReview = async () => {
    try {
      const toastId = toast.loading("AI添削の準備中...");

      // 最新の内容で保存
      const result = await client.api.reports[":id"].$put({
        param: { id: reportId },
        json: {
          title,
          text: content,
          visibility: "PRIVATE",
          pomodoroCount: 0,
          learningTime: 0,
        },
      });

      if (!result.ok) {
        toast.error("保存に失敗しました", { id: toastId });
        return;
      }

      toast.success("最新の内容で更新しました", { id: toastId });

      // データ準備待機
      toast.loading("AI添削のためのデータ準備中...", { id: toastId });
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // API呼び出し
      toast.loading("AI添削中...", { id: toastId });
      try {
        const response = await fetch(`/api/aiFeedback/${reportId}`);

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.error || "AI添削の取得に失敗しました", { id: toastId });
          return;
        }

        const data = await response.json();
        setAIReviewResult(data.responseJson);
        setIsAIReviewDialogOpen(true);
        toast.success("AI添削が完了しました", { id: toastId });
      } catch (error) {
        console.error("API呼び出しエラー:", error);
        toast.error("AI添削の取得に失敗しました。もう一度お試しください", { id: toastId });
      }
    } catch (error) {
      console.error("AI添削エラー:", error);
      toast.error("AI添削の実行中にエラーが発生しました");
    }
  };

  const handleBack = () => {
    router.back();
  };

  // ローディング中は読み込み中の表示
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-sm text-muted-foreground">レポートを読み込んでいます...</p>
      </div>
    );
  }

  return (
    <ReportEditorView
      title={title}
      content={content}
      isAIReviewDialogOpen={isAIReviewDialogOpen}
      aiReviewResult={aiReviewResult}
      draftId={reportId}
      isSaving={isSaving}
      onSetTitle={setTitle}
      onSetContent={setContent}
      onOpenAIReviewDialog={setIsAIReviewDialogOpen}
      onSave={handleSave}
      onAIReview={handleAIReview}
      onAssetsUpload={handleAssetsUpload}
      onBack={handleBack}
      initialContent={content}
    />
  );
}
