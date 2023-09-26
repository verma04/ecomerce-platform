/*
  Warnings:

  - You are about to drop the column `combinationId` on the `productVariant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "productVariant" DROP CONSTRAINT "productVariant_combinationId_fkey";

-- AlterTable
ALTER TABLE "combination" ADD COLUMN     "productVariantId" TEXT;

-- AlterTable
ALTER TABLE "productVariant" DROP COLUMN "combinationId";

-- AddForeignKey
ALTER TABLE "combination" ADD CONSTRAINT "combination_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "productVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
