"use client";

import { Textarea } from "@/components/ui/textarea";

type ProfileEditTextareaProps = {
  title: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export function ProfileEditTextarea({ title, value, placeholder, onChange }: ProfileEditTextareaProps) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Textarea
        className="border border-foreground"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
