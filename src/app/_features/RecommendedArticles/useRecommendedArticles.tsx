"use client";
import type { OGPData } from "@/app/utlis/extractOGPData";
import { useEffect, useState } from "react";

export type RecommendedArticle = {
  id: string;
  url: string;
  title: string;
  description: string;
  thumbnail: string;
};

export function useRecommendedArticles() {
  const [articles, setArticles] = useState<RecommendedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);

      // モックデータ：URL のみで定義
      const mockData: Pick<RecommendedArticle, "id" | "url">[] = [
        {
          id: "1",
          url: "https://www.kanazawa-it.ac.jp/kitnews/2021/1026_bus.html",
        },
        {
          id: "2",
          url: "https://qiita.com/ksyunnnn/items/bfe2b9c568e97bb6b494",
        },
      ];

      try {
        const articlesWithOGP = await Promise.all(
          mockData.map(async (article) => {
            try {
              // 内部 API 経由で OGP 情報を取得
              const res = await fetch(`/api/ogp?url=${encodeURIComponent(article.url)}`);
              if (!res.ok) return { ...article, title: "", description: "", thumbnail: "" };

              const ogpData: OGPData = await res.json();
              return { ...article, ...ogpData };
            } catch (err) {
              console.error(`Failed to fetch OGP for ${article.url}`, err);
              return { ...article, title: "", description: "", thumbnail: "" };
            }
          }),
        );
        setArticles(articlesWithOGP);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, isLoading, error };
}
