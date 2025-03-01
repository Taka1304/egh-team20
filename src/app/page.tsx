"use client";
import Header from "@/app/_features/Navigate/Header/Header";
import { Onboarding } from "@/app/_features/OnboardingDialog";
import { ProfileRecommendedUsers } from "@/app/_features/Profile/ProfileRecommendedUsers/ProfileRecommendedUsers";
import { RecommendedArticles } from "@/app/_features/RecommendedArticles/RecommendedArticles";
import { Timeline } from "@/app/_features/Timeline/Timeline";
import { useEffect, useRef } from "react";

export default function page() {
  const timelineContainerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto py-6 px-4 pt-20 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {/* タイムライン */}
          <div className="md:col-span-2 border rounded-md custom-scrollbar">
            <div
              className="bg-card rounded-lg shadow p-4 h-[calc(100vh-105px)] overflow-hidden isolate"
              style={{
                touchAction: "none",
                WebkitOverflowScrolling: "touch",
                position: "relative",
              }}
            >
              <div
                ref={timelineContainerRef}
                className="h-full overflow-y-auto pr-2 custom-scrollbar" // custom-scrollbarを適用
              >
                <Timeline isNested={true} />
              </div>
            </div>
          </div>

          {/* サイドバー */}
          <div className="space-y-6 md:col-span-1">
            <ProfileRecommendedUsers />
            <RecommendedArticles />
            <Onboarding />
          </div>
        </div>
      </main>
    </div>
  );
}
