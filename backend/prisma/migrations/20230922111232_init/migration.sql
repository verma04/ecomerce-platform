/*
  Warnings:

  - You are about to drop the column `sellerCategoryId` on the `productInformation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "productInformation" DROP CONSTRAINT "productInformation_sellerCategoryId_fkey";

-- DropIndex
DROP INDEX "productInformation_sellerCategoryId_key";

-- AlterTable
ALTER TABLE "productInformation" DROP COLUMN "sellerCategoryId";
