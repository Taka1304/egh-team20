import { MARKDOWN_TEMPLATES } from "@/app/_features/RichEditor/constants";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";

import type { TemplateType } from "@/app/_features/RichEditor/TemplateDialog/TemplateDialogContainer";
import { TemplatePreview } from "@/app/_features/RichEditor/TemplateDialog/TemplatePreview/TemplatePreview";

type TemplateDialogViewProps = {
  isOpen: boolean;
  selectedTemplate: TemplateType | null;
  onClose: () => void;
  onSelectTemplate: () => void;
  onTemplateClick: (template: TemplateType) => void;
};

export default function TemplateDialogView({
  isOpen,
  selectedTemplate,
  onClose,
  onSelectTemplate,
  onTemplateClick,
}: TemplateDialogViewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="fixed top-1/2 left-1/2 max-w-[800px] w-full p-6 bg-white rounded-md shadow-xl transform -translate-x-1/2 -translate-y-1/2">
        <DialogHeader className="items-center text-center">
          <DialogTitle className="text-xl font-bold">テンプレートを選択</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-4">
            {MARKDOWN_TEMPLATES.map((template) => (
              <Button
                key={template.label}
                variant={selectedTemplate?.label === template.label ? "default" : "ghost"}
                className="w-full justify-start border"
                onClick={() => onTemplateClick(template)}
              >
                {template.label}
              </Button>
            ))}
          </div>
          <div>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              {selectedTemplate && <TemplatePreview content={selectedTemplate.template} />}
            </ScrollArea>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="default" className="border bg-destructive hover:scale-95 duration-100" onClick={onClose}>
            キャンセル
          </Button>
          <Button className="hover:scale-95 duration-100" onClick={onSelectTemplate} disabled={!selectedTemplate}>
            選択
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
