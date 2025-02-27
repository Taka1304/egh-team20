"use client";
import { RecommendedArticlesCard } from "@/app/_features/RecommendedArticles/RecommendedArticlesCard";
import { useRecommendedArticles } from "@/app/_features/RecommendedArticles/useRecommendedArticles";
import { Skeleton } from "@/components/ui/skeleton";

export function RecommendedArticles() {
  const { articles, isLoading, error } = useRecommendedArticles();

  if (error) {
    return <div className="text-red-500">エラーが発生しました: {error.message}</div>;
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">おすすめの記事</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, index) => <Skeleton key={_} className="h-[300px] w-full" />)
          : articles.slice(0, 3).map((article) => <RecommendedArticlesCard key={article.id} article={article} />)}
      </div>
    </section>
  );
}
