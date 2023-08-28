/*
  Warnings:

  - You are about to drop the column `productColorId` on the `array` table. All the data in the column will be lost.
  - You are about to drop the column `productSizeId` on the `array` table. All the data in the column will be lost.
  - You are about to drop the `productColor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productSize` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "array" DROP CONSTRAINT "array_productColorId_fkey";

-- DropForeignKey
ALTER TABLE "array" DROP CONSTRAINT "array_productSizeId_fkey";

-- DropForeignKey
ALTER TABLE "productColor" DROP CONSTRAINT "productColor_productId_fkey";

-- DropForeignKey
ALTER TABLE "productSize" DROP CONSTRAINT "productSize_productId_fkey";

-- AlterTable
ALTER TABLE "array" DROP COLUMN "productColorId",
DROP COLUMN "productSizeId";

-- DropTable
DROP TABLE "productColor";

-- DropTable
DROP TABLE "productSize";

-- CreateTable
CREATE TABLE "productFilter" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productSizeId" TEXT NOT NULL,

    CONSTRAINT "productFilter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "productFilter" ADD CONSTRAINT "productFilter_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productFilter" ADD CONSTRAINT "productFilter_productSizeId_fkey" FOREIGN KEY ("productSizeId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
