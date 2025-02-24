"use client";

import { MARKDOWN_TEMPLATES } from "@/app/_features/RichEditor/constants";
import Image from "@tiptap/extension-image";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichEditorView } from "./RichEditorView";

export type RichEditorContainerProps = {
  onChange: (content: string) => void;
  initialContent?: string;
};

export default function RichEditorContainer({ onChange, initialContent }: RichEditorContainerProps) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: initialContent || "",
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[500px]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  // Container側のロジック
  const addImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const insertTemplate = (template: string) => {
    // 初期状態として、エディタにテンプレートをセット
    editor.commands.setContent(template);
  };

  return (
    <RichEditorView
      editor={editor}
      addImage={addImage}
      insertTemplate={insertTemplate}
      markdownTemplates={MARKDOWN_TEMPLATES}
    />
  );
}
