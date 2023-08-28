/*
  Warnings:

  - Made the column `productId` on table `productDetails` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "productDetails" DROP CONSTRAINT "productDetails_productId_fkey";

-- AlterTable
ALTER TABLE "productDetails" ALTER COLUMN "productId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "productDetails" ADD CONSTRAINT "productDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
