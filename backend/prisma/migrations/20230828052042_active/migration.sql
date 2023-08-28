/*
  Warnings:

  - You are about to drop the column `productDetialsId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_productDetialsId_fkey";

-- DropIndex
DROP INDEX "product_productDetialsId_key";

-- AlterTable
ALTER TABLE "ListOrder" ADD COLUMN     "productDetailsId" TEXT;

-- AlterTable
ALTER TABLE "list" ADD COLUMN     "productDetailsId" TEXT;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "productDetialsId";

-- AlterTable
ALTER TABLE "productDetials" ADD COLUMN     "productId" TEXT;

-- CreateTable
CREATE TABLE "productDetails" (
    "id" TEXT NOT NULL,
    "legalDisclaimer" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "productDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_productDetailsId_fkey" FOREIGN KEY ("productDetailsId") REFERENCES "productDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListOrder" ADD CONSTRAINT "ListOrder_productDetailsId_fkey" FOREIGN KEY ("productDetailsId") REFERENCES "productDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productDetails" ADD CONSTRAINT "productDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
