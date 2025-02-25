import type { Report } from "@/app/types/reports";
import { ReportDate } from "@/components/ui/ReportDate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CheckCircle, ChevronDown, Flame, Heart, MessageCircle } from "lucide-react";
import { marked } from "marked";
import { twMerge } from "tailwind-merge";
import { Markdown } from "tiptap-markdown";

type MarkDownContentProps = {
  content: string;
};

type ReportCardViewProps = {
  report: Report;
  displayedContent: string;
  shouldShowMoreButton: boolean;
  onShowMore: () => void;
  isExpanded: boolean;
};

function MarkdownContent({ content }: MarkDownContentProps) {
  const htmlContent = marked(content);
  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content: htmlContent,
    editable: false,
  });

  if (!editor) return null;
  return <EditorContent editor={editor} />;
}

export function ReportCardView({
  report,
  displayedContent,
  shouldShowMoreButton,
  onShowMore,
  isExpanded,
}: ReportCardViewProps) {
  return (
    <Card className="p-4 mb-4 border border-border w-full max-h-[250px] bg-card text-card-foreground rounded-[var(--radius)]">
      {/* ユーザー情報 + 投稿日 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={report.user.avatar} alt={`${report.user.name}のアイコン`} />
            <AvatarFallback className="bg-muted text-muted-foreground">{report.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-card-foreground">{report.user.name}</p>
            <p className="text-sm text-muted-foreground">{report.user.handle}</p>
          </div>
        </div>
        <ReportDate createdAt={report.createdAt} />
      </div>

      {/* 投稿タイトル */}
      {/* <div className="pt-3">
        <h2 className="text-2xl font-bold">{report.title}</h2>
      </div> */}

      {/* 投稿内容 */}
      <div className="mt-2 relative">
        <div
          className={twMerge(
            "prose-container transition-all duration-300 prose",
            !isExpanded && "max-h-[120px] overflow-hidden",
          )}
        >
          <MarkdownContent content={displayedContent} />
        </div>

        {shouldShowMoreButton && !isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent flex items-end justify-center pb-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 font-medium"
              onClick={(e) => {
                e.stopPropagation();
                onShowMore();
              }}
            >
              <ChevronDown className="h-4 w-4 mr-1" />
              続きを読む
            </Button>
          </div>
        )}
      </div>

      {/* タグ */}
      {report.tags && (
        <div className="mt-3 flex flex-wrap gap-2">
          {report.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {/* アクションボタン */}
      <div className="mt-3 flex justify-between text-muted-foreground">
        <Button variant="ghost" size="icon" aria-label="返信" className="hover:text-secondary">
          <MessageCircle className="h-5 w-5" />
        </Button>
        <div className="flex space-x-4">
          <Button variant="ghost" size="icon" aria-label="いいね" className="hover:text-secondary">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="がんばれ" className="hover:text-secondary">
            <Flame className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="参考になった" className="hover:text-secondary">
            <CheckCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
