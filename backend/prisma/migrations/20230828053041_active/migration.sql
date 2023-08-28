/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `productDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "productDetails" DROP CONSTRAINT "productDetails_productId_fkey";

-- AlterTable
ALTER TABLE "productDetails" ALTER COLUMN "productId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "productDetails_productId_key" ON "productDetails"("productId");

-- AddForeignKey
ALTER TABLE "productDetails" ADD CONSTRAINT "productDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
