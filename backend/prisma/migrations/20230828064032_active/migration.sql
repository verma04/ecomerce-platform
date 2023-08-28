/*
  Warnings:

  - You are about to drop the column `productSizeId` on the `productColor` table. All the data in the column will be lost.
  - You are about to drop the column `productSizeId` on the `productSize` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `productColor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `productSize` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "array" ADD COLUMN     "productColorId" TEXT,
ADD COLUMN     "productSizeId" TEXT;

-- AlterTable
ALTER TABLE "productColor" DROP COLUMN "productSizeId";

-- AlterTable
ALTER TABLE "productSize" DROP COLUMN "productSizeId";

-- CreateIndex
CREATE UNIQUE INDEX "productColor_productId_key" ON "productColor"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "productSize_productId_key" ON "productSize"("productId");

-- AddForeignKey
ALTER TABLE "array" ADD CONSTRAINT "array_productColorId_fkey" FOREIGN KEY ("productColorId") REFERENCES "productColor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "array" ADD CONSTRAINT "array_productSizeId_fkey" FOREIGN KEY ("productSizeId") REFERENCES "productSize"("id") ON DELETE SET NULL ON UPDATE CASCADE;
