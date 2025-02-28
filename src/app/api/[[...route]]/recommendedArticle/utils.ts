import { geminiRun } from "@/app/api/[[...route]]/utils";

export async function getRecommendedArticles(reportText: string, getNum: number) {
  const prompt = `以下の内容は，とあるユーザーの日報です．発信したユーザーが関心を持てるものや，より成長につながると考えられる記事を${getNum}つ推薦してください。
  フォーマット例:

  {
    "recommendationUrls": ["https://example.com/article1", "https://example.com/article2"]
  }

  以下の内容は，とあるユーザーの日報です．

  ${reportText}
  `;

  return await geminiRun(prompt);
}
