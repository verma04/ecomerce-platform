/*
  Warnings:

  - Made the column `businessCategoryId` on table `sellerProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "sellerProfile" DROP CONSTRAINT "sellerProfile_businessCategoryId_fkey";

-- AlterTable
ALTER TABLE "sellerProfile" ALTER COLUMN "businessCategoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "sellerProfile" ADD CONSTRAINT "sellerProfile_businessCategoryId_fkey" FOREIGN KEY ("businessCategoryId") REFERENCES "businessCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
