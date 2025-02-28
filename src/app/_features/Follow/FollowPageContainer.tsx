"use client";

import FollowSkeleton from "@/app/_features/Follow/FolloSkeleton";
import Header from "@/app/_features/Navigate/Header/Header";
import { useFollowUsers } from "@/app/hooks/useFollowUsers";
import { Card } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import FollowList from "./FollowList";
import FollowTabs from "./FollowTabs";

export default function FollowPageContainer() {
  const params = useParams<{ username: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"following" | "followers">("following");
  const { users, counts, isLoading, error, follow, unfollow } = useFollowUsers(params.username, activeTab);

  const handleFollowAction = async (userId: string, isFollowing: boolean) => {
    if (isFollowing) {
      await unfollow(userId);
    } else {
      await follow(userId);
    }
  };

  const navigateToProfile = (userId: string) => {
    router.push(`/profile/${userId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-3xl mx-auto px-4 pt-20">
        <Card className="overflow-hidden">
          <FollowTabs activeTab={activeTab} setActiveTab={setActiveTab} counts={counts} isLoading={isLoading} />

          {isLoading ? (
            <FollowSkeleton />
          ) : error ? (
            <div className="p-6">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <FollowList
              users={users}
              activeTab={activeTab}
              onFollowAction={handleFollowAction}
              onNavigateToProfile={navigateToProfile}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
