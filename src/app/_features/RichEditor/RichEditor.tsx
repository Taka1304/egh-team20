import { MARKDOWN_TEMPLATES } from "@/app/_features/RichEditor/constants";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, FileText, Heading2, ImageIcon, Italic, List, ListOrdered, Minus, Quote, Redo, Undo } from "lucide-react";

type RichEditorProps = {
  onChange: (content: string) => void;
  initialContent?: string;
};

export function RichEditor({ onChange, initialContent }: RichEditorProps) {
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

  const addImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const insertTemplate = (template: string) => {
    editor.commands.setContent(template);
  };

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
            {MARKDOWN_TEMPLATES.map((template) => (
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
