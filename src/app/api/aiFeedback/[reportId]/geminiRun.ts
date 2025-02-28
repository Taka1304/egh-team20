import { env } from "@/lib/env";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export async function geminiRun(reportTitle: string, reportText: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });
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
      console.log("解析しようとした文字列:", jsonText);

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
