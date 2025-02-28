import { env } from "@/lib/env";
import { GoogleGenerativeAI } from "@google/generative-ai";
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

export async function geminiRun(prompt: string) {
  try {
    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // レスポンスからJSON部分を抽出する
    let jsonText = text;

    // JSONマークダウンブロックを検出して除去
    const jsonMarkdownMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    // biome-ignore lint/complexity/useOptionalChain: <explanation>
    if (jsonMarkdownMatch && jsonMarkdownMatch[1]) {
      jsonText = jsonMarkdownMatch[1];
    }

    // JSON部分のみを取り出す (最初の{から最後の}まで)
    const jsonMatch = jsonText.match(/(\{[\s\S]*\})/);
    // biome-ignore lint/complexity/useOptionalChain: <explanation>
    if (jsonMatch && jsonMatch[1]) {
      jsonText = jsonMatch[1];
    }

    try {
      const responseJson = JSON.parse(jsonText);
      return { responseJson, responseText: text };
    } catch (parseError) {
      console.error("JSON解析エラー:", parseError);
      console.info("解析しようとした文字列:", jsonText);

      // フォールバック: エラー時のデフォルト応答
      const fallbackJson = {
        analysisSections: {
          configuration: "レポートの構造評価を行えませんでした。",
          fulfilling: "内容の充実度評価を行えませんでした。",
          comprehensive: ["AI処理中にエラーが発生しました。", "もう一度試してみてください。"],
        },
        score: 0,
        comment: "申し訳ありません。レポートの分析中にエラーが発生しました。",
      };

      return { responseJson: fallbackJson, responseText: text };
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Gemini API Error");
  }
}
