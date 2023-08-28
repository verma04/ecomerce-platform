/*
  Warnings:

  - Made the column `sizeId` on table `productVariant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `allColorId` on table `productVariant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "productVariant" DROP CONSTRAINT "productVariant_allColorId_fkey";

-- DropForeignKey
ALTER TABLE "productVariant" DROP CONSTRAINT "productVariant_sizeId_fkey";

-- AlterTable
ALTER TABLE "productVariant" ALTER COLUMN "sizeId" SET NOT NULL,
ALTER COLUMN "allColorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "allSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_allColorId_fkey" FOREIGN KEY ("allColorId") REFERENCES "allColor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
