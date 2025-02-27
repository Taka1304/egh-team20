"use client";

import { MARKDOWN_TEMPLATES } from "@/app/_features/RichEditor/constants";
import { client } from "@/lib/hono";
import Image from "@tiptap/extension-image";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { toast } from "sonner";
import ImageResize from "tiptap-extension-resize-image";
import { RichEditorView } from "./RichEditorView";

export type RichEditorProps = {
  onChange: (content: string) => void;
  initialContent?: string;
};

export default function RichEditor({ onChange, initialContent }: RichEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Image, ImageResize],
    content: initialContent || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[500px]",
      },
      handleDrop: (_view, event, _slice, moved) => {
        // if dropping external files
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          // const file = event.dataTransfer.files[0];
          // if (file.type === "image/jpeg" || file.type === "image/png") {
          //   toast.error("このファイルの形式はサポートされていません");
          //   return false;
          // }
          // if (file.size > 1024 * 1024 * 5) {
          //   toast.error("ファイルサイズが大きすぎます");
          //   return false;
          // }

          const toastId = toast.loading("画像をアップロードしています...");

          client.api.assets.upload
            .$post({
              form: {
                type: "report",
                file: event.dataTransfer.files[0],
              },
            })
            .then((result) => {
              if (result.ok) {
                result.json().then((data) => {
                  editor?.chain().focus().setImage({ src: data.url }).run();
                  toast.success("画像をアップロードしました", { id: toastId });
                });
              }
            })
            .catch((error) => {
              console.error(error);
              toast.error("画像のアップロードに失敗しました", { id: toastId });
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
