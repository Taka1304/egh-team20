"use client";
import Header from "@/app/_features/Navigate/Header/Header";
import { Onboarding } from "@/app/_features/OnboardingDialog";
import { ProfileRecommendedUsers } from "@/app/_features/Profile/ProfileRecommendedUsers/ProfileRecommendedUsers";
import { RecommendedArticles } from "@/app/_features/RecommendedArticles/RecommendedArticles";
import { Timeline } from "@/app/_features/Timeline/Timeline";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // クリーンアップ関数
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-background" style={{ overflow: "hidden" }}>
      <Header />
      <div className="pt-20 p-8 max-h-[calc(100vh-80px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <div className="h-full overflow-hidden">
            <Timeline />
          </div>
          <div className="flex flex-col gap-4 overflow-visible p-2">
            <ProfileRecommendedUsers />
            <RecommendedArticles />
            <Onboarding />
          </div>
        </div>
      </div>
    </div>
  );
}
