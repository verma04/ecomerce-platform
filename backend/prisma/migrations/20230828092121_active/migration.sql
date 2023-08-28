/*
  Warnings:

  - A unique constraint covering the columns `[allSizeId]` on the table `productVariant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[allColorId]` on the table `productVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "productVariant" ADD COLUMN     "allColorId" TEXT,
ADD COLUMN     "allSizeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "productVariant_allSizeId_key" ON "productVariant"("allSizeId");

-- CreateIndex
CREATE UNIQUE INDEX "productVariant_allColorId_key" ON "productVariant"("allColorId");

-- AddForeignKey
ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_allSizeId_fkey" FOREIGN KEY ("allSizeId") REFERENCES "allSize"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_allColorId_fkey" FOREIGN KEY ("allColorId") REFERENCES "allColor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
