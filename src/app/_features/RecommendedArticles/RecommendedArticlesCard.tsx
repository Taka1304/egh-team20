"use client";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { RecommendedArticle } from "./useRecommendedArticles";

type RecommendedArticleCardProps = {
  article: RecommendedArticle;
};

export function RecommendedArticlesCard({ article }: RecommendedArticleCardProps) {
  const imageWidth = 160;
  const imageHeight = 120;

  return (
    <motion.div whileHover={{ scale: 0.99 }} whileTap={{ scale: 0.98 }} className="w-full">
      <Link href={article.url} passHref className="w-full">
        <Card className="overflow-hidden cursor-pointer w-full flex flex-col sm:flex-row">
          <div className="relative min-w-[120px] sm:min-w-[160px] w-full sm:w-[160px] h-[120px] overflow-hidden">
            <Image
              src={article.thumbnail || "/images/default-article-image.png"}
              alt={article.title || "記事のサムネイル"}
              width={imageWidth}
              height={imageHeight}
              style={{
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-md font-semibold mb-2 line-clamp-2">{article.title || "タイトル未取得"}</h3>
            <p className="text-xs text-muted-foreground line-clamp-3 flex-grow">
              {article.description || "説明が取得できませんでした。"}
            </p>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
