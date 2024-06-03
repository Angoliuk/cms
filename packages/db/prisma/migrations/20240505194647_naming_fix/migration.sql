/*
  Warnings:

  - You are about to drop the column `location` on the `Promotion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "location",
ADD COLUMN     "locations" "PROMOTION_LOCATION"[];
