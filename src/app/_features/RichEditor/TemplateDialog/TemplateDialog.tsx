import TemplateDialogView from "@/app/_features/RichEditor/TemplateDialog/TemplateDialogView";
import { useState } from "react";

export type TemplateType = {
  label: string;
  template: string;
};

type TemplateDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (content: string) => void;
};

export default function TemplateDialog({ isOpen, onClose, onSelectTemplate }: TemplateDialogProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null);

  // テンプレートボタン押下時の処理
  const handleTemplateClick = (template: TemplateType) => {
    setSelectedTemplate(template);
  };

  // 「選択」ボタン押下時の処理
  const handleSelectTemplate = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate.template);
      onClose();
    }
  };

  return (
    <TemplateDialogView
      isOpen={isOpen}
      selectedTemplate={selectedTemplate}
      onClose={onClose}
      onSelectTemplate={handleSelectTemplate}
      onTemplateClick={handleTemplateClick}
    />
  );
}
