"use client";
import type { AIReviewResult } from "@/app/_features/AIReviewDialog/AIReviewDialog";
import { client } from "@/lib/hono";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ReportEditorView } from "./ReportEditorView";

export default function ReportEditorContainer() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAIReviewDialogOpen, setIsAIReviewDialogOpen] = useState(false);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [aiReviewResult, setAIReviewResult] = useState<AIReviewResult | undefined>();
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

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
      const result = draftId
        ? await client.api.reports[":id"].$put({
            param: { id: draftId },
            json: {
              title,
              text: content,
              visibility: isDraft ? "PRIVATE" : "PUBLIC",
              pomodoroCount: 0,
              learningTime: 0,
            },
          })
        : await client.api.reports.$post({
            json: {
              title,
              text: content,
              visibility: isDraft ? "PRIVATE" : "PUBLIC",
              pomodoroCount: 0,
              learningTime: 0,
            },
          });

      if (result.ok) {
        const { report } = await result.json();
        isDraft && setDraftId(report.id);
        toast.success("保存しました", { id: toastId });
        if (!isDraft) {
          router.push("/");
        }
      } else {
        toast.error("保存に失敗しました", { id: toastId });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleAIReview = async () => {
    if (!draftId) {
      toast.error("AI添削するには先に下書き保存をしてください");
      return;
    }

    try {
      const toastId = toast.loading("AI添削の準備中...");

      // 最新の内容で保存
      const result = await client.api.reports[":id"].$put({
        param: { id: draftId },
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
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // API呼び出し
      toast.loading("AI添削中...", { id: toastId });
      try {
        const response = await fetch(`/api/aiFeedback/${draftId}`);

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

  return (
    <ReportEditorView
      title={title}
      content={content}
      isAIReviewDialogOpen={isAIReviewDialogOpen}
      aiReviewResult={aiReviewResult}
      draftId={draftId}
      isSaving={isSaving}
      onSetTitle={setTitle}
      onSetContent={setContent}
      onOpenAIReviewDialog={setIsAIReviewDialogOpen}
      onSave={handleSave}
      onAIReview={handleAIReview}
      onAssetsUpload={handleAssetsUpload}
      onBack={handleBack}
    />
  );
}
