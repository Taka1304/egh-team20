import { Prisma } from "@prisma/client";

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
