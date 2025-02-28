import { geminiRun } from "@/app/api/[[...route]]/utils";

export async function getRecommendedArticles(reportTitle: string, reportText: string, getNum: number) {
  const prompt = `以下の内容は，とあるユーザーの日報です．発信したユーザーの成長につながるサイトを${getNum * 5}件おすすめ順に推薦してください。また，確実に存在する記事のURLを指定してください。
  フォーマット例:

  {
    "recommendationUrls": ["https://example.com/article1", "https://example.com/article2"]
  }

  以下の内容は，とあるユーザーの日報です．
  ${reportTitle}

  ${reportText}
  `;
  const response = await geminiRun(prompt);
  // console.info(response.responseJson);
  // return ["https://example.com/article1", "https://example.com/article2"];
  return response.responseJson.recommendationUrls as string[];
}

export async function isUrlAlive(url: string): Promise<boolean> {
  try {
    // YouTubeのURLは無効とする
    if (url.includes("youtube.com") || url.includes("youtu.be") || url.includes("amazon.co.jp")) {
      return false;
    }
    const response = await fetch(url, { method: "HEAD" });

    // ステータスコードが 404 以外なら有効と判断
    return response.status !== 404;
  } catch (error) {
    console.error(`urlのチェックができませんでした: ${url}`);
    return false; // 例外が発生した場合は無効とみなす
  }
}
