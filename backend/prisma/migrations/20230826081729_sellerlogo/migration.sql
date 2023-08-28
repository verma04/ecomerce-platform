/*
  Warnings:

  - You are about to drop the column `qrCodeId` on the `sellerProfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sellerProfile" DROP CONSTRAINT "sellerProfile_qrCodeId_fkey";

-- AlterTable
ALTER TABLE "sellerProfile" DROP COLUMN "qrCodeId";
