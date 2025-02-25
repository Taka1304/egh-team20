"use client";
import { AIReviewDialog } from "@/app/_features/AIReviewDialog/AIReviewDialog";
import type { AIReviewResult } from "@/app/_features/AIReviewDialog/AIReviewDialog";
import RichEditorContainer from "@/app/_features/RichEditor/RichEditorContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAIReviewDialogOpen, setIsAIReviewDialogOpen] = useState(false);
  // AIの出力を保存するための変数
  const [aiReviewResult, setAIReviewResult] = useState<AIReviewResult | undefined>();
  const router = useRouter();
  /**
   * 下書き保存処理
   */
  const handleSaveDraft = () => {};

  /**
   * 公開処理
   */
  const handlePublish = () => {};

  /**
   * AI添削処理
   */
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

  return (
    <div className="min-h-screen bg-white">
      {/* 固定ヘッダー */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-50">
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          <Button variant="ghost" onClick={() => router.back()}>
            閉じる
          </Button>
          <div className="text-sm text-gray-500">{content.length} 文字</div>
          <div className="flex items-center gap-2">
            <Button className="bg-white text-black border" onClick={handleSaveDraft}>
              下書き保存
            </Button>
            <Button className="bg-white text-black border" onClick={handleAIReview}>
              <Bot size={20} />
              AI添削
            </Button>
            <Button className=" font-bold hover:scale-95 duration-100" onClick={handlePublish}>
              公開に進む
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto pt-20 px-4 max-w-3xl">
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4 border">
            <Input
              type="text"
              placeholder="記事タイトル"
              className="!text-3xl font-bold border-0 px-0 focus-visible:ring-0"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <RichEditorContainer onChange={setContent} />
        </div>
      </main>
      <AIReviewDialog open={isAIReviewDialogOpen} onOpenChange={setIsAIReviewDialogOpen} result={aiReviewResult} />
    </div>
  );
}
