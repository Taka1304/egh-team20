"use client";
import { AIReviewSetting } from "@/app/_features/ReportPublishSetting/AIReviewSetting/AIReviewSetting";
import { HashtagSection } from "@/app/_features/ReportPublishSetting/HasttagSection/HashtagSection";
import { PublishHeader } from "@/app/_features/ReportPublishSetting/PublishHeader/PublishHeader";
import { VisibilitySetting } from "@/app/_features/ReportPublishSetting/VisibilitySetting/VisibilitySetting";
import { useState } from "react";

export default function page() {
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="min-h-screen bg-white">
      <PublishHeader />
      <div className="pt-14 flex">
        <main className="ml-60 flex-1 p-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <VisibilitySetting />
            <HashtagSection tags={tags} onAddTag={handleAddTag} onRemoveTag={handleRemoveTag} />
            <AIReviewSetting />
          </div>
        </main>
      </div>
    </div>
  );
}
