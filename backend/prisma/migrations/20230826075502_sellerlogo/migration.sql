/*
  Warnings:

  - You are about to drop the column `sellerProfileId` on the `qrcode` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `sellerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `sellerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `twoFa` on the `sellerProfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "qrcode" DROP CONSTRAINT "qrcode_sellerProfileId_fkey";

-- DropForeignKey
ALTER TABLE "sellerProfile" DROP CONSTRAINT "sellerProfile_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "sellerProfile" DROP CONSTRAINT "sellerProfile_imageId_fkey";

-- DropIndex
DROP INDEX "qrcode_sellerProfileId_key";

-- AlterTable
ALTER TABLE "qrcode" DROP COLUMN "sellerProfileId";

-- AlterTable
ALTER TABLE "sellerProfile" DROP COLUMN "categoryId",
DROP COLUMN "imageId",
DROP COLUMN "twoFa";
