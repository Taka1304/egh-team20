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
    <section className="px-8 py-4 border border-primary-foreground rounded-lg h-fit w-fit">
      <h2 className="text-2xl font-bold mb-4 text-primary-foreground">おすすめの記事</h2>
      <div className="flex flex-col gap-6">
        {isLoading
          ? [1, 2, 3].map((id) => <Skeleton key={`skeleton-${id}`} className="h-[300px] w-full" />)
          : articles.slice(0, 3).map((article) => <RecommendedArticlesCard key={article.id} article={article} />)}
      </div>
    </section>
  );
}
