-- CreateTable
CREATE TABLE "RecommendedArticle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecommendedArticle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecommendedArticle" ADD CONSTRAINT "RecommendedArticle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
