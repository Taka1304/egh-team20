"use client";

import { Textarea } from "@/components/ui/textarea";

type ProfileEditTextareaProps = {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function ProfileEditTextarea({ title, value, onChange, placeholder, disabled }: ProfileEditTextareaProps) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <Textarea
        className="border border-foreground text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        disabled={disabled}
      />
    </div>
  );
}
