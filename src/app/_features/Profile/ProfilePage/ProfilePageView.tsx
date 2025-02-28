import Loading from "@/app/Loading";
import Header from "@/app/_features/Navigate/Header/Header";
import ProfileCard from "@/app/_features/Profile/ProfileCard/ProfileCard";
import { ProfileRecommendedUsers } from "@/app/_features/Profile/ProfileRecommendedUsers/ProfileRecommendedUsers";
import UserStatsList from "@/app/_features/Profile/UserStatsList/UserStatsList";
import { Timeline } from "@/app/_features/Timeline/Timeline";
import type { ProfileUser } from "@/app/hooks/useUser";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ReactNode, useEffect, useRef } from "react";

type ProfilePageViewProps = {
  user: ProfileUser | null;
  isLoading: boolean;
  error: Error | null;
  interests: string[];
  isOwnProfile: boolean;
  userStats: { value: string; label: string }[];
  onProfileUpdate?: () => void;
  chartsComponents?: {
    continuityChart: ReactNode;
    postsChart: ReactNode;
    reactionChart: ReactNode;
  } | null;
};

export default function ProfilePageView({
  user,
  isLoading,
  error,
  interests,
  userStats,
  isOwnProfile,
  onProfileUpdate,
  chartsComponents,
}: ProfilePageViewProps) {
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  // スクロールイベント捕捉のためのイベントハンドラーを設定
  useEffect(() => {
    const timelineContainer = timelineContainerRef.current;

    if (!timelineContainer) return;

    const preventScroll = (e: WheelEvent | TouchEvent) => {
      e.stopPropagation();

      // wheelイベントの場合はさらに詳細な制御
      if (e instanceof WheelEvent) {
        const { deltaY } = e;
        const { scrollTop, scrollHeight, clientHeight } = timelineContainer;

        // 上端でさらに上にスクロールしようとした場合
        if (scrollTop === 0 && deltaY < 0) {
          e.preventDefault();
        }

        // 下端でさらに下にスクロールしようとした場合
        if (scrollTop + clientHeight >= scrollHeight && deltaY > 0) {
          e.preventDefault();
        }
      }
    };

    // パッシブではないリスナーを追加（preventDefault()を使うため）
    timelineContainer.addEventListener("wheel", preventScroll, { passive: false });
    timelineContainer.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      timelineContainer.removeEventListener("wheel", preventScroll);
      timelineContainer.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  // ローディング状態の表示
  if (isLoading) {
    return (
      <div className="bg-background h-screen w-screen">
        <Header />
        <div className="h-screen w-screen flex items-center justify-center">
          <Loading />
        </div>
      </div>
    );
  }

  // エラー状態の表示
  if (error) {
    return (
      <div className="bg-background">
        <Header />
        <div className="w-4/5 flex mx-auto flex-col items-center justify-center h-64">
          <p className="text-red-500">エラーが発生しました: {error.message}</p>
        </div>
      </div>
    );
  }

  // ユーザーが見つからない場合
  if (!user) {
    return (
      <div className="bg-background">
        <Header />
        <div className="w-4/5 flex mx-auto flex-col items-center justify-center h-64">
          <p>ユーザーが見つかりませんでした</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <div className="w-4/5 mx-auto flex-1 flex flex-col gap-4 pb-8">
        {/* プロフィールカード */}
        <div className="mt-4">
          <ProfileCard user={user} isOwnProfile={isOwnProfile} onProfileUpdate={onProfileUpdate} />

          {/* 統計チャート */}
          {chartsComponents && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {chartsComponents.continuityChart}
              {chartsComponents.postsChart}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* 左カラム（プロフィール詳細） */}
          <div className="md:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>自己紹介</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{user.bio || "自己紹介文がありません"}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>興味分野</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {interests.length > 0 ? (
                    interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">設定された興味分野はありません</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <UserStatsList stats={userStats} />

            {chartsComponents && <Card className="p-4">{chartsComponents.reactionChart}</Card>}
          </div>

          {/* 右カラム（タイムラインとおすすめユーザー） */}
          <div className="md:col-span-2">
            {/* タイムライン */}
            <Card className="mb-4">
              <div
                className="h-[600px] overflow-hidden isolate"
                style={{
                  touchAction: "none",
                  WebkitOverflowScrolling: "touch",
                  position: "relative",
                }}
              >
                <div
                  ref={timelineContainerRef}
                  className="h-full overflow-y-auto pr-1 custom-scrollbar"
                  style={{
                    overscrollBehavior: "contain",
                    scrollbarWidth: "thin",
                    isolation: "isolate",
                    position: "relative",
                    zIndex: 10,
                  }}
                >
                  {/* isNested=trueを指定して、プロフィールページ内に埋め込まれていることを伝える */}
                  <Timeline isNested={true} />
                </div>
              </div>
            </Card>
            {/* おすすめユーザー */}
            <ProfileRecommendedUsers />
          </div>
        </div>
      </div>
    </div>
  );
}
