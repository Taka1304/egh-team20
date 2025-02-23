import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Flame, Heart, X } from "lucide-react";

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
};

type TweetModalViewProps = {
  tweet: Tweet;
  comment: string;
  setComment: (value: string) => void;
  onClose: () => void;
};

export function TweetModalView({ tweet, comment, setComment, onClose }: TweetModalViewProps) {
  // 📌 日付を分割（例: "2024/02/23" → 年: 2024, 月: 2, 日: 23, 曜日: 金）
  const dateObj = new Date(tweet.createdAt);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[dateObj.getDay()];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-card p-6 rounded-lg shadow-lg w-[600px] max-w-full text-card-foreground relative">
        {/* 閉じるボタン */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        >
          <X className="w-6 h-6" />
        </button>

        {/* ユーザー情報 + 日付 */}
        <div className="flex items-center justify-between">
          {/* ユーザー情報 */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={tweet.user.avatar} alt={`${tweet.user.name}のアイコン`} />
              <AvatarFallback className="bg-muted text-muted-foreground">{tweet.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-card-foreground">{tweet.user.name}</p>
              <p className="text-sm text-muted-foreground">{tweet.user.handle}</p>
            </div>
          </div>

          {/* 📌 日付表示をカスタマイズ */}
          <div className="flex flex-col items-end">
            {/* 年（上・左寄せ） */}
            <p className="text-sm text-muted-foreground self-start">{year}</p>

            {/* 月・日・曜日（横並び） */}
            <div className="flex items-center space-x-2">
              <p className="text-4xl font-bold text-card-foreground">
                {month}.{day}
              </p>
              <div className="border border-card-foreground rounded-md px-2 py-0.5 text-sm text-card-foreground">
                {weekday}
              </div>
            </div>
          </div>
        </div>

        {/* 投稿内容 */}
        <p className="mt-3 text-card-foreground break-words">{tweet.content}</p>

        {/* 画像 */}
        {tweet.image && <img src={tweet.image} alt="ツイート画像" className="mt-3 rounded-lg border border-border" />}

        {/* アクションボタン */}
        <div className="mt-3 flex justify-between text-muted-foreground">
          {/* ❤️🔥✅ リアクションボタン（右寄せ） */}
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

        {/* 📌 追加: 区切り線 */}
        <div className="border-t card-foreground mt-4 pt-4" />

        {/* コメント入力 */}
        <div className="p-3 bg-muted rounded-md flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback className="text-foreground">ユ</AvatarFallback>
          </Avatar>
          <Input
            type="text"
            placeholder={`返信先 ${tweet.user.handle}`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 bg-input border-border text-foreground"
          />
          <Button size="icon" variant="outline" className="hover:bg-muted">
            ➜
          </Button>
        </div>
      </div>
    </div>
  );
}
