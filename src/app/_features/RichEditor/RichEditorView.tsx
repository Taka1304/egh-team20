"use client";

import TemplateDialog from "@/app/_features/RichEditor/TemplateDialog/TemplateDialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { client } from "@/lib/hono";
import type { Editor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";
import type { InferResponseType } from "hono";
import { Bold, FileText, Heading2, ImageIcon, Italic, List, ListOrdered, Minus, Quote, Redo, Undo } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export type MarkdownTemplate = {
  label: string;
  template: string;
};

export type RichEditorViewProps = {
  editor: Editor;
  onAssetsUpload: (
    file: File,
    toastId?: string | number,
  ) => Promise<InferResponseType<typeof client.api.assets.upload.$post, 200> | undefined>;
  insertTemplate: (template: string) => void;
  markdownTemplates: MarkdownTemplate[];
};

export function RichEditorView({ editor, onAssetsUpload }: RichEditorViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const handleSelectTemplate = (content: string) => {
    editor.commands.setContent(content);
  };
  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const toastId = toast.loading("画像をアップロードしています...");
      onAssetsUpload(file, toastId).then((result) => {
        if (result) {
          editor.chain().focus().setImage({ src: result.url }).run();
          toast.success("画像をアップロードしました", { id: toastId });
        }
      });
    }
  };

  // editor未生成の場合は早期return
  if (!editor) {
    return null;
  }
  return (
    <div className="border rounded-lg bg-white">
      <div className="border-b p-2 flex flex-wrap gap-1">
        <Button
          variant="ghost"
          size="sm"
          className={editor.isActive("heading", { level: 2 }) ? "bg-muted text-primary-foreground" : ""}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={editor.isActive("bold") ? "bg-muted text-primary-foreground" : ""}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={editor.isActive("italic") ? "bg-muted text-primary-foreground" : ""}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={editor.isActive("bulletList") ? "bg-muted text-primary-foreground" : ""}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={editor.isActive("orderedList") ? "bg-muted text-primary-foreground" : ""}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={editor.isActive("blockquote") ? "bg-muted text-primary-foreground" : ""}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleImageButtonClick}>
          <ImageIcon className="h-4 w-4" />
        </Button>
        <input
          type="file"
          accept="image/png, image/jpeg"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" onClick={() => setIsTemplateDialogOpen(true)}>
              <FileText className="h-4 w-4 mr-2" />
              テンプレート
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
        <div className="border-l mx-1" />
        <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
      <TemplateDialog
        isOpen={isTemplateDialogOpen}
        onClose={() => setIsTemplateDialogOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
}
