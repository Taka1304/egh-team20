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
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link href={article.url} passHref>
        <Card className="overflow-hidden cursor-pointer h-36 max-w-[600px] flex">
          <div className="relative w-full min-w-44 max-w-44">
            <Image
              src={article.thumbnail || ""}
              alt={article.title || "記事のサムネイル"}
              fill
              style={{ objectFit: "cover" }}
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
