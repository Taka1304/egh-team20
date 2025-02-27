import Header from "@/app/_features/Navigate/Header/Header";
import { ProfileRecommendedUsers } from "@/app/_features/ProfileRecommendedUsers/ProfileRecommendedUsers";
import { RecommendedArticles } from "@/app/_features/RecommendedArticles/RecommendedArticles";
import { Timeline } from "@/app/_features/Timeline/Timeline";

export default function Home() {
  return (
    <div className="bg-background">
      <Header />
      <div className="pt-20 h-screen w-screen p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Timeline />
          <div className="flex flex-col gap-4">
            <ProfileRecommendedUsers />
            <RecommendedArticles />
          </div>
        </div>
      </div>
    </div>
  );
}
