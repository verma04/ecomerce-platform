/*
  Warnings:

  - You are about to drop the column `allColorId` on the `productVariant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "productVariant" DROP CONSTRAINT "productVariant_allColorId_fkey";

-- DropIndex
DROP INDEX "productVariant_allColorId_key";

-- DropIndex
DROP INDEX "productVariant_allSizeId_key";

-- AlterTable
ALTER TABLE "allColor" ADD COLUMN     "productVariantId" TEXT;

-- AlterTable
ALTER TABLE "productVariant" DROP COLUMN "allColorId";

-- AddForeignKey
ALTER TABLE "allColor" ADD CONSTRAINT "allColor_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "productVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
