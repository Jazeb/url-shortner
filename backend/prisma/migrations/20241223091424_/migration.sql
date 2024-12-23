/*
  Warnings:

  - A unique constraint covering the columns `[originalUrl]` on the table `urls` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "urls_originalUrl_key" ON "urls"("originalUrl");
