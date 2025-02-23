"use client";
import RichEditorContainer from "@/app/_features/RichEditor/RichEditorContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  /**
   * 下書き保存処理
   */
  const handleSaveDraft = () => {};

  /**
   * 公開処理
   */
  const handlePublish = () => {};

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
            <Button className="bg-white text-black border" onClick={handlePublish}>
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
    </div>
  );
}
