"use client";

import { MARKDOWN_TEMPLATES } from "@/app/_features/RichEditor/constants";
import type { client } from "@/lib/hono";
import Image from "@tiptap/extension-image";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { InferResponseType } from "hono/client";
import { useEffect } from "react";
import { toast } from "sonner";
import ImageResize from "tiptap-extension-resize-image";
import { RichEditorView } from "./RichEditorView";

export type RichEditorProps = {
  onChange: (content: string) => void;
  onAssetsUpload: (
    file: File,
    toastId?: string | number,
  ) => Promise<InferResponseType<typeof client.api.assets.upload.$post, 200> | undefined>;
  initialContent?: string;
};

export default function RichEditor({ onChange, onAssetsUpload, initialContent }: RichEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Image, ImageResize],
    content: initialContent || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[500px]",
      },
      handleDrop: (_view, event, _slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const toastId = toast.loading("画像をアップロードしています...");

          onAssetsUpload(event.dataTransfer.files[0], toastId).then((result) => {
            if (result) {
              editor?.chain().focus().setImage({ src: result.url }).run();
              toast.success("画像をアップロードしました", { id: toastId });
            }
          });
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // initialContentが後から変わった場合にも対応
  useEffect(() => {
    if (editor && initialContent && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  if (!editor) {
    return null;
  }

  const insertTemplate = (template: string) => {
    // 初期状態として、エディタにテンプレートをセット
    editor.commands.setContent(template);
  };

  return (
    <RichEditorView
      editor={editor}
      onAssetsUpload={onAssetsUpload}
      insertTemplate={insertTemplate}
      markdownTemplates={MARKDOWN_TEMPLATES}
    />
  );
}
