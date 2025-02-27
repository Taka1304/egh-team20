import { Prisma } from "@prisma/client";
import type { LearningContribution } from "@prisma/client";

export async function recoverFromNotFound<A>(promise: Promise<A>): Promise<A | null> {
  try {
    return await promise;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return null;
      }
    }
    throw e;
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array]; // 元の配列を変更しないようコピー
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 0 〜 i のランダムなインデックス
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // 要素をスワップ
  }
  return shuffledArray;
}

export function calculateStreakDays(contributions: LearningContribution[]): number {
  // 履歴がなければストリークは0
  if (!contributions || contributions.length === 0) {
    return 0;
  }

  // 日付を昇順にソート (activityDateが文字列の場合はDate型にパース)
  const sorted = [...contributions].sort((a, b) => {
    const aTime = new Date(a.activityDate).setHours(0, 0, 0, 0);
    const bTime = new Date(b.activityDate).setHours(0, 0, 0, 0);
    return aTime - bTime;
  });

  // 現在のストリークを計算
  let streak = 1; // 最低1日ぶんは活動があるので1から開始
  for (let i = sorted.length - 2; i >= 0; i--) {
    const currDate = new Date(sorted[i].activityDate).setHours(0, 0, 0, 0);
    const nextDate = new Date(sorted[i + 1].activityDate).setHours(0, 0, 0, 0);

    // 日付差を「丸1日」単位で計算 (時刻の影響を無視するため 00:00 に丸める)
    const diffDays = (nextDate - currDate) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      // 1日差であれば連続日数をインクリメント
      streak++;
    } else {
      // 1日以上空いているので途切れた → ループを抜ける
      break;
    }
  }

  return streak;
}
