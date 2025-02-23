"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import type { Editor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";
import { Bold, FileText, Heading2, ImageIcon, Italic, List, ListOrdered, Minus, Quote, Redo, Undo } from "lucide-react";

export interface MarkdownTemplate {
  label: string;
  template: string;
}

export interface RichEditorViewProps {
  editor: Editor;
  addImage: () => void;
  insertTemplate: (template: string) => void;
  markdownTemplates: MarkdownTemplate[];
}

export function RichEditorView({ editor, addImage, insertTemplate, markdownTemplates }: RichEditorViewProps) {
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
        <Button variant="ghost" size="sm" onClick={addImage}>
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              テンプレート
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {markdownTemplates.map((template) => (
              <DropdownMenuItem key={template.label} onClick={() => insertTemplate(template.template)}>
                {template.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
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
    </div>
  );
}
