import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type RecommendedArticleCardProps = {
  article: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    url: string;
  };
};

export function RecommendedArticlesCard({ article }: RecommendedArticleCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link href={article.url} passHref>
        <Card className="overflow-hidden cursor-pointer h-full flex flex-col">
          <div className="relative h-48 w-full">
            <Image
              src={article.thumbnail || "/placeholder.svg"}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">{article.description}</p>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
