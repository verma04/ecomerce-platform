/*
  Warnings:

  - You are about to drop the `sliderImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `loginSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `loginSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ipAddress` to the `loginSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `loginSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `loginSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `loginSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sliderImage" DROP CONSTRAINT "sliderImage_imageId_fkey";

-- DropForeignKey
ALTER TABLE "sliderImage" DROP CONSTRAINT "sliderImage_merchantCategoryId_fkey";

-- AlterTable
ALTER TABLE "loginSession" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "deviceId" TEXT NOT NULL,
ADD COLUMN     "ipAddress" TEXT NOT NULL,
ADD COLUMN     "latitude" TEXT NOT NULL,
ADD COLUMN     "logout" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "longitude" TEXT NOT NULL,
ADD COLUMN     "token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "merchantCategory" ADD COLUMN     "couponId" TEXT;

-- DropTable
DROP TABLE "sliderImage";

-- CreateTable
CREATE TABLE "subCategory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT,

    CONSTRAINT "subCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qrcode" (
    "qrcode" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "merchantLogo" (
    "id" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "data64Image" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,

    CONSTRAINT "merchantLogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mutipleImage" (
    "imageId" TEXT NOT NULL,
    "merchantCategoryId" TEXT NOT NULL,
    "productVariantId" TEXT
);

-- CreateTable
CREATE TABLE "productColor" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "productColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productSize" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "productSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "productDetialsId" TEXT,

    CONSTRAINT "list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListOrder" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "listId" TEXT,
    "productDetialsId" TEXT,

    CONSTRAINT "ListOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productDetials" (
    "id" TEXT NOT NULL,
    "legalDisclaimer" TEXT NOT NULL,

    CONSTRAINT "productDetials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "merchantId" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "productDetialsId" TEXT,
    "isCancellable" BOOLEAN NOT NULL DEFAULT false,
    "isRefunable" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productReview" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "productId" TEXT,

    CONSTRAINT "productReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productVariant" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "productName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "stock" DECIMAL(65,30) NOT NULL,
    "mrp" DECIMAL(65,30) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "sku" INTEGER NOT NULL,

    CONSTRAINT "productVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupon" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expired" TIMESTAMP(3) NOT NULL,
    "offerPercent" DECIMAL(65,30) NOT NULL,
    "miniMumValue" DECIMAL(65,30) NOT NULL,
    "maxiMumValue" DECIMAL(65,30) NOT NULL,
    "maxiNumDisccount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "qrcode_userId_key" ON "qrcode"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "merchantLogo_merchantId_key" ON "merchantLogo"("merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "mutipleImage_imageId_key" ON "mutipleImage"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "mutipleImage_merchantCategoryId_key" ON "mutipleImage"("merchantCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "ListOrder_listId_key" ON "ListOrder"("listId");

-- CreateIndex
CREATE UNIQUE INDEX "product_productDetialsId_key" ON "product"("productDetialsId");

-- CreateIndex
CREATE UNIQUE INDEX "productReview_productId_key" ON "productReview"("productId");

-- AddForeignKey
ALTER TABLE "subCategory" ADD CONSTRAINT "subCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qrcode" ADD CONSTRAINT "qrcode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchantLogo" ADD CONSTRAINT "merchantLogo_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchantLogo" ADD CONSTRAINT "merchantLogo_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mutipleImage" ADD CONSTRAINT "mutipleImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mutipleImage" ADD CONSTRAINT "mutipleImage_merchantCategoryId_fkey" FOREIGN KEY ("merchantCategoryId") REFERENCES "merchantCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mutipleImage" ADD CONSTRAINT "mutipleImage_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "productVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchantCategory" ADD CONSTRAINT "merchantCategory_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productColor" ADD CONSTRAINT "productColor_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productSize" ADD CONSTRAINT "productSize_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_productDetialsId_fkey" FOREIGN KEY ("productDetialsId") REFERENCES "productDetials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListOrder" ADD CONSTRAINT "ListOrder_listId_fkey" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListOrder" ADD CONSTRAINT "ListOrder_productDetialsId_fkey" FOREIGN KEY ("productDetialsId") REFERENCES "productDetials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_productDetialsId_fkey" FOREIGN KEY ("productDetialsId") REFERENCES "productDetials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productReview" ADD CONSTRAINT "productReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
