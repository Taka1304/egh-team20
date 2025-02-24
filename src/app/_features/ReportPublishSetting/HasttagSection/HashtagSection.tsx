"use client";
import { HashtagSectionView } from "@/app/_features/ReportPublishSetting/HasttagSection/HashtagSectionView";
import { useState } from "react";

type HashtagSectionProps = {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
};

export function HashtagSection({ tags, onAddTag, onRemoveTag }: HashtagSectionProps) {
  const [newTag, setNewTag] = useState("");
  const suggestedTags = ["設計", "実装", "テーマ", "テンプレート", "モーダル"];

  const handleNewTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing && newTag && !tags.includes(newTag)) {
      onAddTag(newTag);
      setNewTag("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  return (
    <HashtagSectionView
      tags={tags}
      newTag={newTag}
      suggestedTags={suggestedTags}
      onNewTag={handleNewTag}
      onInputChange={handleInputChange}
      onAddTag={onAddTag}
      onRemoveTag={onRemoveTag}
    />
  );
}
