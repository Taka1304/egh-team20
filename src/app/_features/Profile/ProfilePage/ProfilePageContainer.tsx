"use client";

import ProfilePageView from "@/app/_features/Profile/ProfilePage/ProfilePageView";
import { useUser } from "@/app/hooks/useUser";
import { useUserStats } from "@/app/hooks/useUserStats";
import { useParams } from "next/navigation";

export default function ProfilePageContainer() {
  const params = useParams<{ username: string }>();
  const username = params?.username;

  const { user, isLoading, error } = useUser(username);
  const { stats } = useUserStats(user?.id);

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

  return (
    <ProfilePageView user={user} isLoading={isLoading} error={error} interests={interests} userStats={userStats} />
  );
}
