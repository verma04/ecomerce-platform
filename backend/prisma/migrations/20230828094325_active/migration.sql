/*
  Warnings:

  - You are about to drop the column `allSizeId` on the `productVariant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sizeId]` on the table `productVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "productVariant" DROP CONSTRAINT "productVariant_allSizeId_fkey";

-- DropIndex
DROP INDEX "productVariant_allSizeId_key";

-- AlterTable
ALTER TABLE "productVariant" DROP COLUMN "allSizeId",
ADD COLUMN     "sizeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "productVariant_sizeId_key" ON "productVariant"("sizeId");

-- AddForeignKey
ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "allSize"("id") ON DELETE SET NULL ON UPDATE CASCADE;
