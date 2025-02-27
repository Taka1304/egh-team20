"use client";
import { useEffect, useState } from "react";

export type RecommendedArticle = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
};
export function useRecommendedArticles() {
  const [articles, setArticles] = useState<RecommendedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        // モックデータ
        const mockData: RecommendedArticle[] = [
          {
            id: "1",
            title: "Next.js入門",
            description: "Next.jsの基本的な使い方を学びます。",
            thumbnail: "https://www.kanazawa-it.ac.jp/kitnews/2021/1026_bus.html",
            url: "https://www.kanazawa-it.ac.jp/kitnews/2021/1026_bus.html",
          },
          {
            id: "2",
            title: "React Hooks徹底解説",
            description: "React Hooksの使い方を徹底的に解説します。",
            thumbnail: "/react.png",
            url: "https://www.kanazawa-it.ac.jp/kitnews/2021/1026_bus.html",
          },
        ];
        setArticles(mockData);
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
