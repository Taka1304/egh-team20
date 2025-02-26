import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Markdown } from "tiptap-markdown";

export const TemplatePreview: React.FC<{ content: string }> = ({ content }) => {
  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content,
    editable: false,
    immediatelyRender: false,
  });

  // content の変更に合わせてエディタ内容を更新
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} className="prose max-w-none text-sm" />;
};
