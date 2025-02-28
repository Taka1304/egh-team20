"use client";

import { client } from "@/lib/hono";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export type ReportEditorProps = {
  initialDraftId?: string;
};

export type ReportDraft = {
  id: string;
  title: string;
  text: string;
  visibility: "PUBLIC" | "PRIVATE" | "FOLLOWERS";
  createdAt: string;
  updatedAt: string;
  pomodoroCount: number;
  learningTime: number;
};

export function useReportEditor({ initialDraftId }: ReportEditorProps = {}) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // 編集モードかどうかを判定（URLパラメータまたは初期値から）
  const reportId = (params?.id as string) || initialDraftId || searchParams?.get("id") || null;
  const [draftId, setDraftId] = useState<string | null>(reportId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingDraft, setIsLoadingDraft] = useState(!!reportId);

  // 下書き一覧を取得
  const [drafts, setDrafts] = useState<ReportDraft[]>([]);
  const [isDraftsLoading, setIsDraftsLoading] = useState(false);

  // 指定されたIDの下書きを取得する
  const fetchDraft = useCallback(async (id: string) => {
    setIsLoadingDraft(true);
    try {
      const response = await client.api.reports[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("下書きの取得に失敗しました");
      }

      const data = await response.json();
      setTitle(data.report.title);
      setContent(data.report.text);
      setDraftId(data.report.id);
      return data.report;
    } catch (err) {
      setError("下書きの読み込みに失敗しました");
      toast.error("下書きの読み込みに失敗しました");
      console.error(err);
      return null;
    } finally {
      setIsLoadingDraft(false);
    }
  }, []);

  // 下書き一覧を取得
  const fetchDrafts = useCallback(async () => {
    setIsDraftsLoading(true);
    try {
      const response = await client.api.reports.drafts.$get({});

      if (!response.ok) {
        // 404の場合は下書きがない状態なのでエラーとしない
        if (response.status === 404) {
          setDrafts([]);
          return [];
        }
        throw new Error("下書き一覧の取得に失敗しました");
      }

      const data = await response.json();
      setDrafts(data.reports);
      return data.reports;
    } catch (err) {
      console.error(err);
      return [];
    } finally {
      setIsDraftsLoading(false);
    }
  }, []);

  /**
   * 保存処理
   * @param isDraft 下書きとして保存するかどうか
   * @returns 保存されたレポートのID
   */
  const saveReport = async (isDraft: boolean) => {
    if (!title.trim()) {
      toast.error("タイトルを入力してください");
      return null;
    }

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

      if (!result.ok) {
        throw new Error("保存に失敗しました");
      }

      const { report } = await result.json();

      if (isDraft) {
        setDraftId(report.id);
        toast.success("下書きを保存しました", { id: toastId });
      } else {
        toast.success("投稿しました", { id: toastId });
      }

      return report.id;
    } catch (err) {
      toast.error("保存に失敗しました", { id: toastId });
      console.error(err);
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * 下書き保存
   */
  const saveDraft = async () => {
    const id = await saveReport(true);
    return id;
  };

  /**
   * 公開
   */
  const publish = async () => {
    const id = await saveReport(false);
    if (id) {
      router.push("/");
    }
    return id;
  };

  /**
   * 画像アップロード処理
   */
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

  // 指定されたIDがある場合は読み込む
  useEffect(() => {
    if (reportId) {
      fetchDraft(reportId);
    }
  }, [reportId, fetchDraft]);

  return {
    // 状態
    title,
    content,
    draftId,
    isLoading: isLoading || isLoadingDraft,
    isSaving,
    error,
    drafts,
    isDraftsLoading,

    // 更新メソッド
    setTitle,
    setContent,

    // アクション
    saveDraft,
    publish,
    fetchDrafts,
    fetchDraft,
    handleAssetsUpload,
  };
}
