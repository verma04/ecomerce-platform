/*
  Warnings:

  - You are about to drop the column `merchantId` on the `coupon` table. All the data in the column will be lost.
  - You are about to drop the column `merchantCategoryId` on the `mutipleImage` table. All the data in the column will be lost.
  - You are about to drop the column `merchantId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `merchant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `merchantAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `merchantBankAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `merchantCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `merchantKyc` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `merchantLogo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `merchantWareHouse` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sellerCategoryId]` on the table `mutipleImage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sellerId` to the `coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerCategoryId` to the `mutipleImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerId` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- DropForeignKey
ALTER TABLE "coupon" DROP CONSTRAINT "coupon_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "loginSession" DROP CONSTRAINT "loginSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "merchant" DROP CONSTRAINT "merchant_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "merchant" DROP CONSTRAINT "merchant_subCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "merchantAddress" DROP CONSTRAINT "merchantAddress_merchantKycId_fkey";

-- DropForeignKey
ALTER TABLE "merchantBankAccount" DROP CONSTRAINT "merchantBankAccount_merchantKycId_fkey";

-- DropForeignKey
ALTER TABLE "merchantCategory" DROP CONSTRAINT "merchantCategory_couponId_fkey";

-- DropForeignKey
ALTER TABLE "merchantCategory" DROP CONSTRAINT "merchantCategory_imageId_fkey";

-- DropForeignKey
ALTER TABLE "merchantCategory" DROP CONSTRAINT "merchantCategory_userId_fkey";

-- DropForeignKey
ALTER TABLE "merchantKyc" DROP CONSTRAINT "merchantKyc_userId_fkey";

-- DropForeignKey
ALTER TABLE "merchantLogo" DROP CONSTRAINT "merchantLogo_imageId_fkey";

-- DropForeignKey
ALTER TABLE "merchantLogo" DROP CONSTRAINT "merchantLogo_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "merchantWareHouse" DROP CONSTRAINT "merchantWareHouse_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "mutipleImage" DROP CONSTRAINT "mutipleImage_merchantCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "qrcode" DROP CONSTRAINT "qrcode_userId_fkey";

-- DropIndex
DROP INDEX "mutipleImage_merchantCategoryId_key";

-- AlterTable
ALTER TABLE "coupon" DROP COLUMN "merchantId",
ADD COLUMN     "sellerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "mutipleImage" DROP COLUMN "merchantCategoryId",
ADD COLUMN     "sellerCategoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "merchantId",
ADD COLUMN     "sellerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "merchant";

-- DropTable
DROP TABLE "merchantAddress";

-- DropTable
DROP TABLE "merchantBankAccount";

-- DropTable
DROP TABLE "merchantCategory";

-- DropTable
DROP TABLE "merchantKyc";

-- DropTable
DROP TABLE "merchantLogo";

-- DropTable
DROP TABLE "merchantWareHouse";

-- CreateTable
CREATE TABLE "seller" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "slug" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "user_type" NOT NULL DEFAULT 'admin',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "subCategoryId" TEXT,
    "categoryId" TEXT,
    "isMailVerifild" BOOLEAN NOT NULL DEFAULT false,
    "emailToken" TEXT NOT NULL,

    CONSTRAINT "seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sellerLogo" (
    "id" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "data64Image" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "sellerLogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sellerKyc" (
    "id" TEXT NOT NULL,
    "gstIn" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "sellerKyc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sellerAddress" (
    "addressLin1" TEXT NOT NULL,
    "addressLine2" TEXT NOT NULL,
    "landMark" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pinCode" TEXT NOT NULL,
    "sellerKycId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "sellerBankAccount" (
    "accountNumber" TEXT NOT NULL,
    "ifscCode" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "sellerKycId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "sellerCategory" (
    "id" TEXT NOT NULL,
    "sort" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "couponId" TEXT,

    CONSTRAINT "sellerCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sellerWareHouse" (
    "id" TEXT NOT NULL,
    "gstIn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sellerId" TEXT NOT NULL,
    "addressLin1" TEXT NOT NULL,
    "addressLine2" TEXT NOT NULL,
    "landMark" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pinCode" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "sellerWareHouse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "seller_email_key" ON "seller"("email");

-- CreateIndex
CREATE UNIQUE INDEX "seller_slug_key" ON "seller"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "sellerLogo_sellerId_key" ON "sellerLogo"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "sellerKyc_userId_key" ON "sellerKyc"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "sellerAddress_sellerKycId_key" ON "sellerAddress"("sellerKycId");

-- CreateIndex
CREATE UNIQUE INDEX "sellerBankAccount_sellerKycId_key" ON "sellerBankAccount"("sellerKycId");

-- CreateIndex
CREATE UNIQUE INDEX "sellerCategory_imageId_key" ON "sellerCategory"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "mutipleImage_sellerCategoryId_key" ON "mutipleImage"("sellerCategoryId");

-- AddForeignKey
ALTER TABLE "qrcode" ADD CONSTRAINT "qrcode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seller" ADD CONSTRAINT "seller_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "subCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerLogo" ADD CONSTRAINT "sellerLogo_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerLogo" ADD CONSTRAINT "sellerLogo_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loginSession" ADD CONSTRAINT "loginSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerKyc" ADD CONSTRAINT "sellerKyc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerAddress" ADD CONSTRAINT "sellerAddress_sellerKycId_fkey" FOREIGN KEY ("sellerKycId") REFERENCES "sellerKyc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerBankAccount" ADD CONSTRAINT "sellerBankAccount_sellerKycId_fkey" FOREIGN KEY ("sellerKycId") REFERENCES "sellerKyc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mutipleImage" ADD CONSTRAINT "mutipleImage_sellerCategoryId_fkey" FOREIGN KEY ("sellerCategoryId") REFERENCES "sellerCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerCategory" ADD CONSTRAINT "sellerCategory_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerCategory" ADD CONSTRAINT "sellerCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerCategory" ADD CONSTRAINT "sellerCategory_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerWareHouse" ADD CONSTRAINT "sellerWareHouse_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
