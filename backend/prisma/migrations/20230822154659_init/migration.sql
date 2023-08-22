/*
  Warnings:

  - You are about to drop the `kyc` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "deviceType" AS ENUM ('web', 'android', 'ios');

-- DropTable
DROP TABLE "kyc";

-- CreateTable
CREATE TABLE "loginSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "loginSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deviceInfo" (
    "id" TEXT NOT NULL,
    "loginSessionId" TEXT NOT NULL,
    "device" "deviceType" NOT NULL,

    CONSTRAINT "deviceInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchantKyc" (
    "id" TEXT NOT NULL,
    "gstIn" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "merchantKyc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "merchantAddress" (
    "addressLin1" TEXT NOT NULL,
    "addressLine2" TEXT NOT NULL,
    "landMark" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pinCode" TEXT NOT NULL,
    "merchantKycId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "merchantBankAccount" (
    "accountNumber" TEXT NOT NULL,
    "ifscCode" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "merchantKycId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "sliderImage" (
    "imageId" TEXT NOT NULL,
    "merchantCategoryId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "merchantCategory" (
    "id" TEXT NOT NULL,
    "sort" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "merchantCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "loginSession_userId_key" ON "loginSession"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "deviceInfo_loginSessionId_key" ON "deviceInfo"("loginSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "merchantKyc_userId_key" ON "merchantKyc"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "merchantAddress_merchantKycId_key" ON "merchantAddress"("merchantKycId");

-- CreateIndex
CREATE UNIQUE INDEX "merchantBankAccount_merchantKycId_key" ON "merchantBankAccount"("merchantKycId");

-- CreateIndex
CREATE UNIQUE INDEX "sliderImage_imageId_key" ON "sliderImage"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "sliderImage_merchantCategoryId_key" ON "sliderImage"("merchantCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "merchantCategory_imageId_key" ON "merchantCategory"("imageId");

-- AddForeignKey
ALTER TABLE "loginSession" ADD CONSTRAINT "loginSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deviceInfo" ADD CONSTRAINT "deviceInfo_loginSessionId_fkey" FOREIGN KEY ("loginSessionId") REFERENCES "loginSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchantKyc" ADD CONSTRAINT "merchantKyc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchantAddress" ADD CONSTRAINT "merchantAddress_merchantKycId_fkey" FOREIGN KEY ("merchantKycId") REFERENCES "merchantKyc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchantBankAccount" ADD CONSTRAINT "merchantBankAccount_merchantKycId_fkey" FOREIGN KEY ("merchantKycId") REFERENCES "merchantKyc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sliderImage" ADD CONSTRAINT "sliderImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sliderImage" ADD CONSTRAINT "sliderImage_merchantCategoryId_fkey" FOREIGN KEY ("merchantCategoryId") REFERENCES "merchantCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchantCategory" ADD CONSTRAINT "merchantCategory_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchantCategory" ADD CONSTRAINT "merchantCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
