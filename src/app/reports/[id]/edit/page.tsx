"use client";
import { RichEditor } from "@/app/_features/RichEditor/RichEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  /**
   * 下書き保存処理
   */
  const handleSaveDraft = useCallback(() => {
    console.log("下書き保存:", { title, content });
  }, [title, content]);

  /**
   * 公開処理
   */
  const handlePublish = useCallback(() => {
    console.log("公開:", { title, content });
  }, [title, content]);

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

          <RichEditor onChange={setContent} initialContent="" />
        </div>
      </main>
    </div>
  );
}
