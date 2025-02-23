"use client";
import TagSelector from "@/app/_features/ReportAddDialog/TagSelector/TagSelctor";
import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent } from "@radix-ui/react-dialog";
import { useState } from "react";

export default function ReportAddDialogView() {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTemtemplate, setSelectedTemplate] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const [open, setOpen] = useState(true);
  const templates = [
    { id: "daily", name: "日報", content: "## 今日の学習内容\n\n## 気づき\n\n## 次のアクション\n" },
    { id: "weekly", name: "週報", content: "## 今週の達成事項\n\n## 来週の目標\n\n## 振り返り\n" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[525px] bg-card p-4 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-primary-foreground">学習ログを投稿</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="学んだこと、気づき、次のアクションなどを共有しましょう..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            rows={6}
            className="border-primary text-primary-foreground"
          />
          <TagSelector
            tags={tags}
            onTagsChange={setTags}
            isComposing={isComposing}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
        </div>
        <div>
          <Label htmlFor="template-select" className="text-primary-foreground">
            テンプレート選択
          </Label>
          <select
            id="template-select"
            value={selectedTemtemplate}
            onChange={(e) => {
              setSelectedTemplate(e.target.value);
              const template = templates.find((t) => t.id === e.target.value);
              if (template) {
                setContent(template.content);
              }
            }}
            className="w-full mt-1 rounded-md border border-primary bg-primary-foreground py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-ring sm:text-sm"
          >
            <option value="">テンプレートを選択</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
        <DialogFooter className="pt-2">
          <Button className="bg-destructive hover:scale-95 duration-150">キャンセル</Button>
          <Button className="hover:scale-95 duration-150">投稿</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
