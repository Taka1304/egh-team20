"use client";

import ProfilePageView from "@/app/_features/Profile/ProfilePage/ProfilePageView";
import ContinuityChart from "@/app/_features/Profile/UserCharts/ContinuityChart/ContinuityChart";
import PostsChart from "@/app/_features/Profile/UserCharts/PostsChart/PostsChart";
import ReactionChart from "@/app/_features/Profile/UserCharts/ReactionChart/ReactionChart";
import { useUser } from "@/app/hooks/useUser";
import { useUserStats } from "@/app/hooks/useUserStats";
import { useParams } from "next/navigation";

export default function ProfilePageContainer() {
  const params = useParams<{ username: string }>();
  const username = params?.username;

  const { user, isLoading, error, refetch, isOwnProfile } = useUser(username);
  const { stats, isLoading: statsLoading, error: statsError } = useUserStats(user?.id);

  // UserInterestからinterests配列に変換
  const interests = user?.UserInterest?.map((ui) => ui.interest.name) || [];

  // データが取得できた場合、統計情報を表示用に整形
  const userStats = stats
    ? [
        { value: stats.streakDays.toString(), label: "累計継続日数" },
        { value: stats.postsCount.toString(), label: "投稿数" },
        { value: stats.reactionsCount.toString(), label: "リアクション数" },
        { value: stats.badgesCount.toString(), label: "バッジ取得数" },
      ]
    : [];

  // チャートコンポーネント
  const chartsComponents = stats
    ? {
        continuityChart: <ContinuityChart continuityData={stats.continuityData} />,
        postsChart: <PostsChart postsData={stats.postsData} />,
        reactionChart: <ReactionChart reactionData={stats.reactionData} />,
      }
    : null;

  return (
    <ProfilePageView
      user={user}
      isLoading={isLoading || statsLoading}
      error={error || statsError}
      interests={interests}
      userStats={userStats}
      isOwnProfile={isOwnProfile}
      onProfileUpdate={refetch}
      chartsComponents={chartsComponents}
    />
  );
}
