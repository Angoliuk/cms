/*
  Warnings:

  - You are about to drop the `TagsOnNews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TagsOnNews";

-- CreateTable
CREATE TABLE "_NewsToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_NewsToTag_AB_unique" ON "_NewsToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_NewsToTag_B_index" ON "_NewsToTag"("B");
