import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Flame, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Tweet = {
  id: number;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
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
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}

// 📌 個別のツイートを描画するコンポーネント
function TweetCard({ tweet }: { tweet: Tweet }) {
  const [showFullContent, setShowFullContent] = useState(false);

  const maxLength = 200;
  const isLongContent = tweet.content.length > maxLength;
  const displayedContent = showFullContent ? tweet.content : `${tweet.content.slice(0, maxLength)}...`;

  return (
    <Card className="p-4 mb-4 border border-border w-full bg-card text-card-foreground rounded-[var(--radius)]">
      {/* ユーザー情報 + 日付 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={tweet.user.avatar} alt={`${tweet.user.name}のアイコン`} />
            <AvatarFallback className="bg-muted text-muted-foreground">{tweet.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-card-foreground">{tweet.user.name}</p>
            <p className="text-sm text-muted-foreground">{tweet.user.handle}</p>
          </div>
        </div>
        {/* 日付表示 */}
        <p className="text-2xl text-muted-foreground">{tweet.createdAt}</p>
      </div>

      {/* 📌 投稿内容 */}
      <p className="mt-2 text-card-foreground break-words overflow-hidden">{displayedContent}</p>

      {/* もっと見るボタン（長文のみ表示） */}
      {isLongContent && !showFullContent && (
        <button
          type="button"
          onClick={() => setShowFullContent(true)}
          className="text-primary hover:text-primary-foreground hover:underline text-sm mt-1"
        >
          もっと見る
        </button>
      )}

      {/* 画像 */}
      {tweet.image && <img src={tweet.image} alt={tweet.content} className="mt-2 rounded-lg border border-border" />}

      {/* リンク */}
      {tweet.link && (
        <Link
          href={tweet.link}
          className="text-primary hover:text-primary-foreground mt-2 block"
          target="_blank"
          rel="noopener noreferrer"
        >
          {tweet.link}
        </Link>
      )}

      {/* アクションボタン（返信 & いいね & がんばれ & 参考になった） */}
      <div className="mt-3 flex space-x-4 text-muted-foreground">
        <Button variant="ghost" size="icon" aria-label="返信" className="hover:text-secondary">
          <MessageCircle className="h-5 w-5" />
        </Button>
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
    </Card>
  );
}
