/*
  Warnings:

  - You are about to drop the column `bussinessCategoryId` on the `sellerProfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sellerProfile" DROP CONSTRAINT "sellerProfile_bussinessCategoryId_fkey";

-- AlterTable
ALTER TABLE "sellerProfile" DROP COLUMN "bussinessCategoryId",
ADD COLUMN     "businessCategoryId" TEXT;

-- AddForeignKey
ALTER TABLE "sellerProfile" ADD CONSTRAINT "sellerProfile_businessCategoryId_fkey" FOREIGN KEY ("businessCategoryId") REFERENCES "businessCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
