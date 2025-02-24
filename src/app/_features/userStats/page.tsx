import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type UserStatsProps = {
  user: {
    totalLearningDays: number;
    totalLearningTimes: number;
    averageLearningTime: number;
    longestStreak: number;
  };
};

export function UserStats({ user }: UserStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>活動統計</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">総活動日数</p>
            <p className="text-2xl font-bold">{user.totalLearningDays}日</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">総活動時間</p>
            <p className="text-2xl font-bold">{user.totalLearningTimes}時間</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">1日平均学習時間</p>
            <p className="text-2xl font-bold">{user.averageLearningTime}分</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">最長連続隔週日数</p>
            <p className="text-2xl font-bold">{user.longestStreak}日</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
