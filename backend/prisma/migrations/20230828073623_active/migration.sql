/*
  Warnings:

  - You are about to drop the column `brandName` on the `productVariant` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `productVariant` table. All the data in the column will be lost.
  - You are about to drop the `array` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "array" DROP CONSTRAINT "array_imageId_fkey";

-- DropForeignKey
ALTER TABLE "array" DROP CONSTRAINT "array_productColorId_fkey";

-- DropForeignKey
ALTER TABLE "array" DROP CONSTRAINT "array_productSizeId_fkey";

-- AlterTable
ALTER TABLE "productVariant" DROP COLUMN "brandName",
DROP COLUMN "productName";

-- DropTable
DROP TABLE "array";

-- CreateTable
CREATE TABLE "allSize" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageId" TEXT,
    "productSizeId" TEXT,

    CONSTRAINT "allSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allColor" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageId" TEXT,
    "productColorId" TEXT,

    CONSTRAINT "allColor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "allSize" ADD CONSTRAINT "allSize_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allSize" ADD CONSTRAINT "allSize_productSizeId_fkey" FOREIGN KEY ("productSizeId") REFERENCES "productSize"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allColor" ADD CONSTRAINT "allColor_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allColor" ADD CONSTRAINT "allColor_productColorId_fkey" FOREIGN KEY ("productColorId") REFERENCES "productColor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
