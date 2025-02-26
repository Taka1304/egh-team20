"use client";

import Header from "@/app/_features/Navigate/Header/Header";
import { RecommendedUsers } from "@/app/_features/RecommendedUsers/RecommendedUsers";
import { Timeline } from "@/app/_features/Timeline/Timeline";

export default function TopPage() {
  return (
    <div className="container mx-auto px-4 h-screen flex py-8 mt-10">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full">
        {/* 中央のタイムライン（スクロール可 / スクロールバー非表示） */}
        <div className="w-full flex justify-center h-full overflow-y-auto hidden-scrollbar md:col-span-2">
          <div className="w-full ">
            <Timeline />
          </div>
        </div>

        {/* 右側の「おすすめの人」リスト */}
        <div className="md:col-span-1 h-full overflow-y-auto hidden-scrollbar">
          <RecommendedUsers />
        </div>
      </div>
    </div>
  );
}
