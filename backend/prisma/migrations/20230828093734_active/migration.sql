/*
  Warnings:

  - You are about to drop the column `productVariantId` on the `allColor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "allColor" DROP CONSTRAINT "allColor_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "productVariant" DROP CONSTRAINT "productVariant_productId_fkey";

-- AlterTable
ALTER TABLE "allColor" DROP COLUMN "productVariantId";

-- AlterTable
ALTER TABLE "productVariant" ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
