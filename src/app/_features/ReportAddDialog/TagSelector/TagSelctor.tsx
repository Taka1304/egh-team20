import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type TagSelectorProps = {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  isComposing: boolean;
  onCompositionStart: () => void;
  onCompositionEnd: () => void;
};

export default function TagSelector({
  tags,
  onTagsChange,
  isComposing,
  onCompositionStart,
  onCompositionEnd,
}: TagSelectorProps) {
  // 新規タグ入力用
  const [inputTag, setInputTag] = useState("");

  // タグ追加処理
  const handleAddTag = () => {
    const trimmedTag = inputTag.trim();
    if (trimmedTag === "") return;
    // 新規タグを追加
    onTagsChange([...tags, trimmedTag]);
    setInputTag("");
  };

  // Enterキーでタグ追加
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isComposing) {
        return;
      }
      e.preventDefault();
      handleAddTag();
    }
  };

  // 指定タグを削除
  const handleRemoveTag = (tag: string) => {
    onTagsChange(tags.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-primary-foreground">タグ</Label>
      {/* 追加済みタグをチップ形式で表示 */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div key={tag} className="flex items-center bg-gray-200 text-gray-800 rounded-full px-3 py-1">
            <span>{tag}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveTag(tag)}
              className="ml-1 p-0"
              aria-label={`Remove tag ${tag}`}
            >
              x
            </Button>
          </div>
        ))}
      </div>
      {/* タグ入力欄と追加ボタン */}
      <div className="flex gap-2">
        <Input
          placeholder="タグを追加"
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          className="flex-grow text-primary-foreground border-primary"
        />
        <Button onClick={handleAddTag} className=" hover:scale-95 duration-100">
          追加
        </Button>
      </div>
    </div>
  );
}
