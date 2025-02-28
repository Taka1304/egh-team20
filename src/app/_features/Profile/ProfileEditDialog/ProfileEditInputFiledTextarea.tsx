"use client";

import { Input } from "@/components/ui/input";

type ProfileEditInputFiledProps = {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function ProfileEditInputFiledTextarea({
  title,
  value,
  onChange,
  placeholder,
  disabled,
}: ProfileEditInputFiledProps) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <Input
        className="border border-foreground"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}
