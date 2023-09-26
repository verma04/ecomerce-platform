/*
  Warnings:

  - You are about to drop the column `inventoryId` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `inventory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sellerCategoryId]` on the table `productInformation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_inventoryId_fkey";

-- AlterTable
ALTER TABLE "inventory" ADD COLUMN     "productId" TEXT;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "inventoryId";

-- CreateIndex
CREATE UNIQUE INDEX "inventory_productId_key" ON "inventory"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "productInformation_sellerCategoryId_key" ON "productInformation"("sellerCategoryId");

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
