import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { type Context, Hono } from "hono";

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

const app = new Hono().get("/:reportId", async (c) => {
  const reportId = c.req.param("reportId");

  const report = await prisma.dailyReport.findUnique({
    where: {
      id: reportId,
    },
    select: {
      id: true,
      title: true,
      text: true,
      userId: true,
    },
  });
  if (!report) {
    return c.json({ error: "Reportがありません" }, 404);
  }

  const { responseJson, responseText } = await geminiRun(c, report.title, report.text);
  prisma.aIFeedback.create({
    data: {
      reportId: report.id,
      sentiment: "まだ実装されていません",
      feedbackText: responseText,
    },
  });
  return c.json({ message: "success", responseJson });
});
export default app;

async function geminiRun(c: Context, reportTitle: string, reportText: string) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
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

## 出力フォーマット指定
以下のJSONスキーマを厳守:
{
  "analysisSections": {
    "configuration": "{構成評価}",
    "fulfilling": "{充実度評価}",
    "comprehensive": ["{改善点1}", "{改善点2}"]
  },
  "score": 1~10までの整数か0.5刻みの小数,
  "comment": "{ポジティブなコメント}"
}

### 出力例
{
  "analysisSections": {
    "configuration": "記事の構造は明確で、読み手に伝わりやすい形式になっています。特に、セクション分けが効果的です。",
    "fulfilling": "学習内容と気づきが具体的に記述されており、読み手の理解を促進しています。",
    "comprehensive": ["具体的な例や図表を追加することで、より理解が深まるでしょう","次のアクションにタイムラインを設定すると、目標がより明確になります"]
  },
  "score": 8.5,
  "comment": "優れた学習記録です。改善点を意識することで、さらに質の高い日報になるでしょう。"
}

## レビューしてもらいたい日報データ
\`\`\` md
# ${reportTitle}
${reportText}
\`\`\`

`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  const responseJson = JSON.parse(text);
  return { responseJson: responseJson, responseText: text };
}
