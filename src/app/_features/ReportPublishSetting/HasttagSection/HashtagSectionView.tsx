import { Badge } from "@/components/ui/badge";

type HashtagSectionViewProps = {
  tags: string[];
  newTag: string;
  suggestedTags: string[];
  onNewTag: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
};

export function HashtagSectionView({
  tags,
  newTag,
  suggestedTags,
  onNewTag,
  onInputChange,
  onAddTag,
  onRemoveTag,
}: HashtagSectionViewProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">ハッシュタグ</h2>
      <div className="flex flex-wrap items-center gap-2 border rounded p-2 max-w-xl">
        {tags.map((tag) => (
          <div key={tag} className="flex items-center bg-primary text-primary-foreground rounded px-2 py-1">
            <Badge className="cursor-pointer" onClick={() => onRemoveTag(tag)}>
              #{tag}
            </Badge>
          </div>
        ))}
        <input
          type="text"
          placeholder="ハッシュタグを追加"
          value={newTag}
          onChange={onInputChange}
          onKeyDown={onNewTag}
          className="flex-grow outline-none"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestedTags.map((tag) => (
          <Badge
            key={tag}
            className="cursor-pointer hover:scale-95 duration-100"
            onClick={() => (tags.includes(tag) ? onRemoveTag(tag) : onAddTag(tag))}
          >
            #{tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
