import { Button } from "@/components/ui/button";

type FollowTabsProps = {
  activeTab: "following" | "followers";
  setActiveTab: (tab: "following" | "followers") => void;
  userCount: number;
  isLoading: boolean;
};

export default function FollowTabs({ activeTab, setActiveTab, userCount, isLoading }: FollowTabsProps) {
  return (
    <div className="flex border-b">
      {["following", "followers"].map((tab) => (
        <Button
          key={tab}
          className={`flex-1 py-4 rounded-none ${
            activeTab === tab ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"
          }`}
          onClick={() => setActiveTab(tab as "following" | "followers")}
        >
          {tab === "following" ? "フォロー中" : "フォロワー"}
          {!isLoading && <span className="ml-2 text-sm font-normal">({userCount})</span>}
        </Button>
      ))}
    </div>
  );
}
