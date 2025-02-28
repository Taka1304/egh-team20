// src/app/api/users/[id]/stats/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id;

    // ユーザーとその登録日を取得
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        createdAt: true, // 登録日を取得
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ユーザーの登録日を基準にする
    const userStartDate = new Date(user.createdAt);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 基本的な統計データを取得
    const [postsCount, reactionsCount, badgesCount] = await Promise.all([
      // 投稿数
      prisma.dailyReport.count({
        where: { userId },
      }),
      // 受け取ったリアクション数
      prisma.reaction.count({
        where: {
          report: {
            userId,
          },
        },
      }),
      // バッジ数
      prisma.userBadge.count({
        where: { userId },
      }),
    ]);

    // 日報データを取得（ユーザー登録日以降のすべてのデータ）
    // 日付別にグループ化して、各日に何件の投稿があったかを取得
    const dailyReports = await prisma.dailyReport.findMany({
      where: {
        userId,
        createdAt: {
          gte: userStartDate,
        },
      },
      orderBy: { createdAt: "asc" },
    });

    // 日報の日付を抽出して、ユニークな日付のセットを作成（日ごとに1とカウント）
    const uniqueDates = new Set();
    // biome-ignore lint/complexity/noForEach: <explanation>
    dailyReports.forEach((report) => {
      const dateStr = report.createdAt.toISOString().split("T")[0]; // YYYY-MM-DDの形式
      uniqueDates.add(dateStr);
    });

    // 活動日数の計算 - 日報を書いた日をカウント（1日1回としてカウント）
    const streakDays = uniqueDates.size;

    // 1週間ごとの継続日数データを作成
    const continuityData: { date: string; days: number }[] = [];
    const weekMap = new Map<string, number>();

    // まず各日付の日報データを週ごとにグループ化する
    // biome-ignore lint/complexity/noForEach: <explanation>
    dailyReports.forEach((report) => {
      const date = new Date(report.createdAt);
      const dateStr = date.toISOString().split("T")[0];

      // この日付がすでにカウントされていなければカウント
      if (!weekMap.has(dateStr)) {
        // 週の始め（日曜日）の日付を取得
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());

        const weekKey = weekStart.toISOString().split("T")[0];
        const currentCount = weekMap.get(weekKey) || 0;
        weekMap.set(weekKey, currentCount + 1);

        // 日付をカウント済みとしてマーク
        weekMap.set(dateStr, 1);
      }
    });

    // 登録日からの週ごとのデータを作成（最大24週間）
    const weeks = [];
    // biome-ignore lint/style/useConst: <explanation>
    let currentDate = new Date(userStartDate);

    // 週の始め（日曜日）に調整
    currentDate.setDate(currentDate.getDate() - currentDate.getDay());

    while (weeks.length < 24 && currentDate <= today) {
      weeks.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7); // 1週間進める
    }

    // 表示する週のデータを作成
    // biome-ignore lint/complexity/noForEach: <explanation>
    weeks.forEach((weekDate) => {
      const weekKey = weekDate.toISOString().split("T")[0];
      const formattedDate = weekDate.toLocaleDateString("ja-JP", { month: "short", day: "numeric" });

      // この週に何日活動したか（日報を書いた日数）
      let daysCount = 0;

      // その週の7日間をループ
      for (let i = 0; i < 7; i++) {
        const day = new Date(weekDate);
        day.setDate(day.getDate() + i);
        const dayKey = day.toISOString().split("T")[0];

        // この日に日報を書いていれば+1
        if (weekMap.has(dayKey) && weekMap.get(dayKey) === 1) {
          daysCount++;
        }
      }

      continuityData.push({
        date: formattedDate,
        days: daysCount,
      });
    });

    // 月別投稿データを取得（登録日以降）
    // 月別に集計
    const monthlyPosts: Record<string, number> = {};

    // 登録月から現在までの全ての月を初期化
    // biome-ignore lint/style/useConst: <explanation>
    let currentMonth = new Date(userStartDate);
    currentMonth.setDate(1); // 月の初日に設定

    while (currentMonth <= today) {
      const monthKey = currentMonth.toLocaleString("ja-JP", { month: "short", year: "numeric" });
      monthlyPosts[monthKey] = 0;

      // 次の月に進める
      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    // 実際の投稿データで集計
    // biome-ignore lint/complexity/noForEach: <explanation>
    dailyReports.forEach((report) => {
      const month = report.createdAt.toLocaleString("ja-JP", { month: "short", year: "numeric" });
      monthlyPosts[month] = (monthlyPosts[month] || 0) + 1;
    });

    const postsData = Object.entries(monthlyPosts)
      .sort((a, b) => {
        // 月の文字列を日付に変換して比較（「12月 2023」→ Date）
        const dateA = new Date(a[0].replace("月", ""));
        const dateB = new Date(b[0].replace("月", ""));
        return dateA.getTime() - dateB.getTime();
      })
      .map(([month, count]) => ({
        month,
        count,
      }));

    // リアクション種類別データ
    const reactions = await prisma.reaction.findMany({
      where: {
        report: {
          userId,
        },
      },
      include: {
        type: true,
      },
    });

    const reactionCounts: Record<string, number> = {};
    // biome-ignore lint/complexity/noForEach: <explanation>
    reactions.forEach((reaction) => {
      const typeName = reaction.type.name;
      reactionCounts[typeName] = (reactionCounts[typeName] || 0) + 1;
    });

    const reactionData = Object.entries(reactionCounts).map(([name, value]) => ({
      name,
      value,
    }));

    return NextResponse.json({
      streakDays,
      postsCount,
      reactionsCount,
      badgesCount,
      continuityData,
      postsData,
      reactionData,
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json({ error: "Failed to fetch user statistics" }, { status: 500 });
  }
}
