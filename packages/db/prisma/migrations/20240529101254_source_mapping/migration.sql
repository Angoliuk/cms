/*
  Warnings:

  - Added the required column `idKey` to the `Source` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkKey` to the `Source` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicationDateKey` to the `Source` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleKey` to the `Source` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Source" ADD COLUMN     "descriptionKey" TEXT,
ADD COLUMN     "idKey" TEXT NOT NULL,
ADD COLUMN     "imageLinkKey" TEXT,
ADD COLUMN     "linkKey" TEXT NOT NULL,
ADD COLUMN     "publicationDateKey" TEXT NOT NULL,
ADD COLUMN     "titleKey" TEXT NOT NULL;
