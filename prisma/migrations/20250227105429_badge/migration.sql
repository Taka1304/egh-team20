/*
  Warnings:

  - Added the required column `grade` to the `Badge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Badge" ADD COLUMN     "grade" INTEGER NOT NULL,
ADD COLUMN     "tagline" TEXT;
