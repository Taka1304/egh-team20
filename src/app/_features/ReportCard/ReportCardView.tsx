"use client";

import MarkdownContent from "@/app/_features/MarkdownContent/MarkdownContent";
import ActionButton from "@/app/_features/ReportCard/ActionButton/ActionButton";

import type { Report } from "@/app/types/reports";
import { ReportDate } from "@/components/ui/ReportDate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle, ChevronDown, Flame, Heart, MessageCircle } from "lucide-react";

type ReportCardViewProps = {
  report: Report;
  displayedContent: string;
  shouldShowMoreButton: boolean;
  onShowMore: () => void;
  onLike: () => void;
  onFlame: () => void;
  onCheck: () => void;
  onComment: () => void;
  isExpanded: boolean;
  hasLiked: boolean;
  hasFlamed: boolean;
  hasChecked: boolean;
  likes: number; // ← 追加
  flames: number; // ← 追加
  checks: number; // ← 追加
};

export function ReportCardView({
  report,
  displayedContent,
  shouldShowMoreButton,
  onShowMore,
  onLike,
  onFlame,
  onCheck,
  onComment,
  isExpanded,
  hasLiked,
  hasFlamed,
  hasChecked,
  likes,
  flames,
  checks,
}: ReportCardViewProps) {
  return (
    <Card
      className={cn(
        "p-4 mb-4 border hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer",
        !isExpanded && "max-h-[400px]",
      )}
    >
      {/* ユーザー情報 + 投稿日 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 ring-2 ring-background">
            <AvatarImage src={report.user.avatar} alt={`${report.user.name}のアイコン`} />
            <AvatarFallback>{report.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold">{report.user.name}</p>
            <p className="text-sm text-muted-foreground">{report.user.handle}</p>
          </div>
        </div>
        <ReportDate createdAt={report.createdAt} />
      </div>

      {/* 投稿タイトル */}
      {report.title && (
        <div className="pt-3">
          <h2 className="text-lg font-bold">{report.title}</h2>
        </div>
      )}

      {/* 投稿内容 */}
      <div className="mt-2 relative">
        <div className={cn("transition-all duration-300", !isExpanded && "max-h-[160px] overflow-hidden")}>
          <MarkdownContent content={displayedContent} />
        </div>

        {shouldShowMoreButton && !isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent flex items-end justify-center pb-2">
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
        <div className="mt-4 flex flex-wrap gap-2">
          {report.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {/* アクションボタン */}
      <div className="mt-4 flex justify-between items-center border-t pt-3">
        <Button variant="ghost" size="sm" className="space-x-2" onClick={onComment}>
          <MessageCircle className="h-4 w-4" />
          <span>{report.comments || 0}</span>
        </Button>
        <div className="flex space-x-2">
          <ActionButton icon={Heart} label="いいね" count={likes} onClick={onLike} active={hasLiked} />
          <ActionButton icon={Flame} label="ファイト" count={flames} onClick={onFlame} active={hasFlamed} />
          <ActionButton icon={CheckCircle} label="チェック" count={checks} onClick={onCheck} active={hasChecked} />
        </div>
      </div>
    </Card>
  );
}
