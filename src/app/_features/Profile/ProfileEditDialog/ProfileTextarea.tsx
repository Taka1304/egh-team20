"use client";

import { Textarea } from "@/components/ui/textarea";

type ProfileTextareaProps = {
  title: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export function ProfileTextarea({ title, value, placeholder, onChange }: ProfileTextareaProps) {
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
