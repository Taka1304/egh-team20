import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

type Tweet = {
  id: number;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  image?: string;
  link?: string;
};

type TimelineViewProps = {
  tweets: Tweet[];
};

export function TimelineView({ tweets }: TimelineViewProps) {
  return (
    <div className="max-w-2xl mx-auto mt-16 p-4">
      {tweets.map((tweet) => (
        <Card key={tweet.id} className="p-4 mb-4 border border-gray-200">
          {/* ユーザー情報 */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={tweet.user.avatar} alt={`${tweet.user.name}のアイコン`} />
              <AvatarFallback>{tweet.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">{tweet.user.name}</p>
              <p className="text-sm text-muted-foreground">{tweet.user.handle}</p>
            </div>
          </div>

          {/* 投稿内容 */}
          <p className="mt-2 text-foreground">{tweet.content}</p>

          {/* 画像 */}
          {tweet.image && (
            <img src={tweet.image} alt={tweet.content} className="mt-2 rounded-lg border border-gray-300" />
          )}

          {/* リンク */}
          {tweet.link && (
            <Link href={tweet.link} className="text-blue-500 mt-2 block" target="_blank" rel="noopener noreferrer">
              {tweet.link}
            </Link>
          )}

          {/* アクションボタン（返信 & いいね のみ） */}
          <div className="mt-3 flex space-x-4 text-muted-foreground">
            <Button variant="ghost" size="icon" aria-label="返信">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="いいね">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
