-- CreateEnum
CREATE TYPE "NEWS_VISIBILITY" AS ENUM ('HIDDEN', 'VISIBLE');

-- CreateEnum
CREATE TYPE "SOURCE_PERIOD" AS ENUM ('DAILY', 'HOURLY');

-- CreateEnum
CREATE TYPE "PROMOTION_LOCATION" AS ENUM ('LIST', 'SEARCH');

-- CreateEnum
CREATE TYPE "PROMOTION_LOCATION_LIST_TYPE" AS ENUM ('MAIN', 'TAG_FILTER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageLink" TEXT,
    "originalPublicationDate" TIMESTAMP(3) NOT NULL,
    "originalLink" TEXT NOT NULL,
    "visibility" "NEWS_VISIBILITY" NOT NULL DEFAULT 'VISIBLE',
    "isDraft" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnNews" (
    "newsId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnNews_pkey" PRIMARY KEY ("newsId","tagId")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "periodicity" "SOURCE_PERIOD" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionConfig" (
    "id" TEXT NOT NULL,
    "location" "PROMOTION_LOCATION" NOT NULL,
    "promotionsPerPage" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromotionConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "id" TEXT NOT NULL,
    "location" "PROMOTION_LOCATION"[],
    "listType" "PROMOTION_LOCATION_LIST_TYPE",
    "priority" INTEGER,
    "search" TEXT,
    "text" TEXT,
    "url" TEXT,
    "link" TEXT,
    "newsId" TEXT,
    "isDraft" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "TagsOnNews_tagId_idx" ON "TagsOnNews"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "PromotionConfig_location_key" ON "PromotionConfig"("location");

-- CreateIndex
CREATE INDEX "Promotion_newsId_idx" ON "Promotion"("newsId");
