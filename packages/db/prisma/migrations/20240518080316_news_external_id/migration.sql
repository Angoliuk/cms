/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `News` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" ADD COLUMN     "externalId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "News_externalId_key" ON "News"("externalId");
