import { ReportDate } from "@/components/ui/ReportDate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Flame, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
  link?: string;
};

type TimelineViewProps = {
  reports: Report[];
};

export function TimelineView({ reports }: TimelineViewProps) {
  return (
    <div className="max-w-2xl mx-auto mt-16 p-4">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}

// 📌 個別のツイートを描画するコンポーネント
function ReportCard({ report }: { report: Report }) {
  const [showFullContent, setShowFullContent] = useState(false);

  const maxLength = 200;
  const isLongContent = report.content.length > maxLength;
  const displayedContent = showFullContent ? report.content : `${report.content.slice(0, maxLength)}...`;

  return (
    <Card className="p-4 mb-4 border border-border w-full bg-card text-card-foreground rounded-[var(--radius)]">
      {/* ユーザー情報 + 日付 */}
      <div className="flex items-center justify-between">
        {/* ユーザー情報 */}
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

        {/* 📌 ReportDate コンポーネントを使う */}
        <ReportDate createdAt={report.createdAt} />
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

      {report.image && <img src={report.image} alt={report.content} className="mt-2 rounded-lg border border-border" />}

      {report.link && (
        <Link
          href={report.link}
          className="text-primary hover:text-primary-foreground mt-2 block"
          target="_blank"
          rel="noopener noreferrer"
        >
          {report.link}
        </Link>
      )}

      {/* アクションボタン（返信 & いいね & がんばれ & 参考になった） */}
      <div className="mt-3 flex justify-between text-muted-foreground">
        {/* 💬 コメントボタン（左寄せ） */}
        <Button variant="ghost" size="icon" aria-label="返信" className="hover:text-secondary">
          <MessageCircle className="h-5 w-5" />
        </Button>

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
    </Card>
  );
}
