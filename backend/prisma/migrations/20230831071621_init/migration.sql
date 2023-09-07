/*
  Warnings:

  - You are about to drop the column `expired` on the `coupon` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usesPerCostomer` to the `coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `flat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountAmount` to the `flat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minimumOrderValue` to the `flat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aboveAmmout` to the `free` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buy` to the `getOneFree` table without a default value. This is not possible if the table is not empty.
  - Added the required column `get` to the `getOneFree` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usesPerOrder` to the `getOneFree` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maximum` to the `percentage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minimumOrderValue` to the `percentage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentage` to the `percentage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `percentage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "usesPerCostomer" AS ENUM ('once', 'costom', 'unlimited');

-- CreateEnum
CREATE TYPE "couponOn" AS ENUM ('all', 'product', 'category');

-- AlterTable
ALTER TABLE "coupon" DROP COLUMN "expired",
ADD COLUMN     "couponOn" TEXT NOT NULL DEFAULT 'all',
ADD COLUMN     "enddate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "usesNumer" INTEGER,
ADD COLUMN     "usesPerCostomer" "usesPerCostomer" NOT NULL;

-- AlterTable
ALTER TABLE "flat" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "discountAmount" TEXT NOT NULL,
ADD COLUMN     "minimumOrderValue" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "free" ADD COLUMN     "aboveAmmout" INTEGER NOT NULL,
ADD COLUMN     "productId" TEXT;

-- AlterTable
ALTER TABLE "getOneFree" ADD COLUMN     "buy" INTEGER NOT NULL,
ADD COLUMN     "get" INTEGER NOT NULL,
ADD COLUMN     "usesPerOrder" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "percentage" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "maximum" INTEGER NOT NULL,
ADD COLUMN     "minimumOrderValue" INTEGER NOT NULL,
ADD COLUMN     "percentage" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "couponId" TEXT;

-- AlterTable
ALTER TABLE "productVariant" ALTER COLUMN "sku" DROP NOT NULL;

-- AlterTable
ALTER TABLE "sellerCategory" ADD COLUMN     "couponId" TEXT;

-- AddForeignKey
ALTER TABLE "sellerCategory" ADD CONSTRAINT "sellerCategory_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "free" ADD CONSTRAINT "free_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
