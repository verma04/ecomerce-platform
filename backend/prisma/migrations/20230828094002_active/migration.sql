/*
  Warnings:

  - A unique constraint covering the columns `[allSizeId]` on the table `productVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "productVariant_allSizeId_key" ON "productVariant"("allSizeId");
