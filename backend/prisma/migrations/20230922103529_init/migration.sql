/*
  Warnings:

  - You are about to drop the column `listId` on the `ListOrder` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `list` table. All the data in the column will be lost.
  - You are about to drop the column `productDetailsId` on the `list` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `list` table. All the data in the column will be lost.
  - You are about to drop the column `brandName` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `allColorId` on the `productVariant` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `productVariant` table. All the data in the column will be lost.
  - You are about to drop the column `mrp` on the `productVariant` table. All the data in the column will be lost.
  - You are about to drop the column `sizeId` on the `productVariant` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `productVariant` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `productVariant` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `productVariant` table. All the data in the column will be lost.
  - You are about to alter the column `stock` on the `productVariant` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `price` on the `productVariant` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to drop the `allColor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `allSize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mutipleImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productColor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `value` to the `list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `combinationId` to the `productVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountedPrice` to the `productVariant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ListOrder" DROP CONSTRAINT "ListOrder_listId_fkey";

-- DropForeignKey
ALTER TABLE "allColor" DROP CONSTRAINT "allColor_imageId_fkey";

-- DropForeignKey
ALTER TABLE "allColor" DROP CONSTRAINT "allColor_productColorId_fkey";

-- DropForeignKey
ALTER TABLE "allSize" DROP CONSTRAINT "allSize_imageId_fkey";

-- DropForeignKey
ALTER TABLE "allSize" DROP CONSTRAINT "allSize_productSizeId_fkey";

-- DropForeignKey
ALTER TABLE "list" DROP CONSTRAINT "list_productDetailsId_fkey";

-- DropForeignKey
ALTER TABLE "mutipleImage" DROP CONSTRAINT "mutipleImage_imageId_fkey";

-- DropForeignKey
ALTER TABLE "mutipleImage" DROP CONSTRAINT "mutipleImage_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "mutipleImage" DROP CONSTRAINT "mutipleImage_sellerCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_imageId_fkey";

-- DropForeignKey
ALTER TABLE "productColor" DROP CONSTRAINT "productColor_productId_fkey";

-- DropForeignKey
ALTER TABLE "productVariant" DROP CONSTRAINT "productVariant_allColorId_fkey";

-- DropForeignKey
ALTER TABLE "productVariant" DROP CONSTRAINT "productVariant_sizeId_fkey";

-- DropIndex
DROP INDEX "ListOrder_listId_key";

-- AlterTable
ALTER TABLE "ListOrder" DROP COLUMN "listId";

-- AlterTable
ALTER TABLE "list" DROP COLUMN "description",
DROP COLUMN "productDetailsId",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT,
ADD COLUMN     "value" TEXT NOT NULL,
ADD COLUMN     "variantId" TEXT;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "brandName",
DROP COLUMN "productName";

-- AlterTable
ALTER TABLE "productVariant" DROP COLUMN "allColorId",
DROP COLUMN "createdAt",
DROP COLUMN "mrp",
DROP COLUMN "sizeId",
DROP COLUMN "sku",
DROP COLUMN "status",
DROP COLUMN "updatedAt",
ADD COLUMN     "combinationId" TEXT NOT NULL,
ADD COLUMN     "discountedPrice" INTEGER NOT NULL,
ALTER COLUMN "stock" SET DATA TYPE INTEGER,
ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- DropTable
DROP TABLE "allColor";

-- DropTable
DROP TABLE "allSize";

-- DropTable
DROP TABLE "mutipleImage";

-- DropTable
DROP TABLE "productColor";

-- CreateTable
CREATE TABLE "variant" (
    "id" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "combination" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "combination_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "variant" ADD CONSTRAINT "variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "variant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_combinationId_fkey" FOREIGN KEY ("combinationId") REFERENCES "combination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
