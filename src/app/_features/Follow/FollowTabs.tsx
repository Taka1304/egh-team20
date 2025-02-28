import type { FollowCounts } from "@/app/hooks/useFollowUsers";
import { Button } from "@/components/ui/button";

type FollowTabsProps = {
  activeTab: "following" | "followers";
  setActiveTab: (tab: "following" | "followers") => void;
  counts: FollowCounts;
  isLoading: boolean;
};

export default function FollowTabs({ activeTab, setActiveTab, counts, isLoading }: FollowTabsProps) {
  return (
    <div className="flex border-b">
      <Button
        className={`flex-1 py-4 rounded-none ${
          activeTab === "following" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"
        }`}
        onClick={() => setActiveTab("following")}
      >
        フォロー中
        {!isLoading && <span className="ml-2 text-sm font-normal">({counts.followingCount})</span>}
      </Button>
      <Button
        className={`flex-1 py-4 rounded-none ${
          activeTab === "followers" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"
        }`}
        onClick={() => setActiveTab("followers")}
      >
        フォロワー
        {!isLoading && <span className="ml-2 text-sm font-normal">({counts.followerCount})</span>}
      </Button>
    </div>
  );
}
