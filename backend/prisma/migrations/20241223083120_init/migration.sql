-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);
