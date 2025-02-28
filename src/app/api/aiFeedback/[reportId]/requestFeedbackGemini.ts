import { geminiRun } from "@/app/api/[[...route]]/utils";
import { env } from "@/lib/env";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export async function requestFeedbackGemini(reportTitle: string, reportText: string) {
  try {
    const prompt = `# 出力フォーマット仕様書
  あなたは、日報の内容を評価するAIエージェントです。
  以下の仕様に従って、日報の内容を評価し、ポジティブなコメントを出力してください。

  ## 出力ルール
  - 数値は全て半角
  - 各出力は50文字まで
  - 禁止語句: "と思います", "た方がいい"
  - ポジティブな内容を中心
  - 評価基準: 客観性 > 網羅性
  - 必ず有効なJSONのみを返してください。マークダウンの記法や追加のテキストを含めないでください。

  ## 出力フォーマット指定
  以下のJSONスキーマを厳守:
  {
    "analysisSections": { "configuration": "{構成評価}", "fulfilling": "{充実度評価}", "comprehensive": ["{改善点1}", "{改善点2}"] },
    "score": 1~10までの整数か0.5刻みの小数,
    "comment": "{ポジティブなコメント}"
  }

  ## レビューしてもらいたい日報データ
  \`\`\` md
  # ${reportTitle}
  ${reportText}
  \`\`\`
  `;
    return await geminiRun(prompt);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Gemini API Error");
  }
}
