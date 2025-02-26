import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { marked } from "marked";
import { Markdown } from "tiptap-markdown";

type MarkDownContentProps = {
  content: string;
};

export default function MarkdownContent({ content }: MarkDownContentProps) {
  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content: marked(content),
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <EditorContent
      editor={editor}
      className="prose prose-sm max-w-none dark:prose-invert
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-xl prose-h1:text-card-foreground prose-h2:text-lg prose-h2:text-card-foreground prose-h3:text-base prose-h3:text-card-foreground
        prose-p:leading-relaxed prose-p:my-2
        prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg
        prose-code:text-primary prose-code:bg-muted/50 prose-code:rounded prose-code:px-1
        prose-ul:my-2 prose-ol:my-2
        prose-li:my-0 text-card-foreground"
    />
  );
}
