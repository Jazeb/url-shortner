/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `urls` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "urls_originalUrl_key";

-- CreateIndex
CREATE UNIQUE INDEX "urls_slug_key" ON "urls"("slug");
