"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Bot,
  Code,
  File,
  FileText,
  Image,
  Link2,
  List,
  ListOrdered,
  Menu,
  Minus,
  Plus,
  Quote,
  Type,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const insertMarkdown = (markdown: string) => {
    if (!textareaRef.current) return;

    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const text = content;
    const before = text.substring(0, start);
    const after = text.substring(end);

    setContent(before + markdown + after);
    setIsMenuOpen(false);

    setTimeout(() => {
      if (!textareaRef.current) return;
      const newCursorPos = start + markdown.length;
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleSaveDraft = () => {
    console.log("下書き保存:", { title, content });
  };

  const handlePublish = () => {
    console.log("公開:", { title, content });
  };

  return (
    <div className="min-h-screen bg-white">
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
          <Input
            type="text"
            placeholder="日報タイトル"
            className="!text-3xl font-bold border-0 px-0 focus-visible:ring-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem onClick={() => insertMarkdown("# ")}>
                  <Type className="mr-2 h-4 w-4" />
                  <span>見出し</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertMarkdown("![画像の説明](画像のURL)\n")}>
                  <Image className="mr-2 h-4 w-4" />
                  <span>画像</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertMarkdown("[リンクテキスト](URL)\n")}>
                  <Link2 className="mr-2 h-4 w-4" />
                  <span>リンク</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertMarkdown("- ")}>
                  <List className="mr-2 h-4 w-4" />
                  <span>箇条書きリスト</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertMarkdown("1. ")}>
                  <ListOrdered className="mr-2 h-4 w-4" />
                  <span>番号付きリスト</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertMarkdown("> ")}>
                  <Quote className="mr-2 h-4 w-4" />
                  <span>引用</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertMarkdown("```\nコードをここに入力\n```\n")}>
                  <Code className="mr-2 h-4 w-4" />
                  <span>コード</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertMarkdown("\n---\n")}>
                  <Minus className="mr-2 h-4 w-4" />
                  <span>区切り線</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bot className="mr-2 h-4 w-4" />
                  <span>AIアシスタント</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <File className="mr-2 h-4 w-4" />
                  <span>ファイル</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Menu className="mr-2 h-4 w-4" />
                  <span>目次</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button size="icon">
              <FileText className="h-4 w-4" />
            </Button>
          </div>

          <Textarea
            ref={textareaRef}
            placeholder="本文を入力..."
            className="min-h-[500px] resize-none border-0 px-0 focus-visible:ring-0"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </main>
    </div>
  );
}
