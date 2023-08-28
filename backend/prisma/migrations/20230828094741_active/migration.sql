/*
  Warnings:

  - A unique constraint covering the columns `[allColorId]` on the table `productVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "productVariant" ADD COLUMN     "allColorId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "productVariant_allColorId_key" ON "productVariant"("allColorId");

-- AddForeignKey
ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_allColorId_fkey" FOREIGN KEY ("allColorId") REFERENCES "allColor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
