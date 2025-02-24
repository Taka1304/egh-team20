import { ReportDate } from "@/components/ui/ReportDate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Flame, Heart, X } from "lucide-react";

type Reply = {
  id: number;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
};

type Report = {
  id: number;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  image?: string;
  replies?: Reply[];
};

type ReportModalViewProps = {
  report: Report;
  comment: string;
  setComment: (value: string) => void;
  onClose: () => void;
};

export function ReportModalView({ report, comment, setComment, onClose }: ReportModalViewProps) {
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
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={report.user.avatar} alt={`${report.user.name}のアイコン`} />
              <AvatarFallback className="bg-muted text-muted-foreground">{report.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-card-foreground">{report.user.name}</p>
              <p className="text-sm text-muted-foreground">{report.user.handle}</p>
            </div>
          </div>

          {/* ✅ ここを ReportDate に置き換え */}
          <ReportDate createdAt={report.createdAt} />
        </div>

        {/* 投稿内容 */}
        <p className="mt-3 text-card-foreground break-words">{report.content}</p>

        {/* 画像 */}
        {report.image && <img src={report.image} alt="投稿画像" className="mt-3 rounded-lg border border-border" />}

        {/* アクションボタン */}
        <div className="mt-3 flex justify-between text-muted-foreground">
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

        {/* 📌 返信一覧 */}
        {report.replies && report.replies.length > 0 && (
          <>
            <div className="border-t card-foreground mt-4 pt-4" />
            <p className="text-sm text-muted-foreground font-semibold mb-2">返信</p>
            <div className="space-y-3">
              {report.replies.map((reply) => (
                <div key={reply.id} className="flex items-start space-x-3 bg-muted p-3 rounded-md">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={reply.user.avatar} alt={`${reply.user.name}のアイコン`} />
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      {reply.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-card-foreground">
                      {reply.user.name} <span className="text-sm text-muted-foreground">{reply.user.handle}</span>
                    </p>
                    <p className="text-sm text-card-foreground">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 📌 コメント入力 */}
        <div className="border-t card-foreground mt-4 pt-4" />
        <div className="p-3 bg-muted rounded-md flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback className="text-foreground">ユ</AvatarFallback>
          </Avatar>
          <Input
            type="text"
            placeholder={`返信先 ${report.user.handle}`}
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
