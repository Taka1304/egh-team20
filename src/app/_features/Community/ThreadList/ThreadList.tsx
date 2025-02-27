"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export type Thread = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  createdAt: string;
  commentsCount: number;
};

type ThreadListProps = {
  threads: Thread[];
  communityId: string;
};

export function ThreadList({ threads, communityId }: ThreadListProps) {
  const router = useRouter();

  // 日付フォーマットは簡潔な関数により実装
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex-1 h-[calc(100vh-56px)] overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">スレッド一覧</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新規スレッド
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="p-4 space-y-4">
          {threads.map((thread) => (
            <button
              type="button"
              key={thread.id}
              className="border rounded-lg p-4 bg-card hover:bg-card/80 cursor-pointer transition-colors text-left w-full"
              onClick={() => router.push(`/communities/${communityId}/threads/${thread.id}`)}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={thread.authorImage} alt={thread.authorName} />
                  <AvatarFallback>{thread.authorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{thread.authorName}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(thread.createdAt)}</p>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-1">{thread.title}</h3>
              <p className="text-muted-foreground line-clamp-2">{thread.content}</p>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{thread.commentsCount}件のコメント</span>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
