"use client";
import Loading from "@/app/Loading";
import { RecommendedArticlesCard } from "@/app/_features/RecommendedArticles/RecommendedArticlesCard";
import { useRecommendedArticles } from "@/app/_features/RecommendedArticles/useRecommendedArticles";
import { Skeleton } from "@/components/ui/skeleton";

export function RecommendedArticles() {
  const { articles, isLoading, error } = useRecommendedArticles();

  if (error) {
    return <div className="text-red-500">エラーが発生しました: {error.message}</div>;
  }

  return (
    <section className="px-5 py-4 border border-primary-foreground bg-card rounded-lg w-full">
      <h2 className="text-lg font-bold text-card-foreground mb-3">おすすめの記事</h2>
      <div className="flex flex-col gap-6 w-full">
        {isLoading ? (
          <>
            <Skeleton className="h-36 w-full bg-primary-foreground flex items-center justify-center">
              <Loading />
            </Skeleton>
            <Skeleton className="h-36 w-full bg-primary-foreground flex items-center justify-center">
              <Loading />
            </Skeleton>
          </>
        ) : (
          articles.slice(0, 3).map((article) => <RecommendedArticlesCard key={article.id} article={article} />)
        )}
      </div>
    </section>
  );
}
