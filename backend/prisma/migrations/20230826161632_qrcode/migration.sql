/*
  Warnings:

  - You are about to drop the `qrcode` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "sellerProfile" ADD COLUMN     "qrCodeId" TEXT;

-- DropTable
DROP TABLE "qrcode";

-- CreateTable
CREATE TABLE "qrCode" (
    "id" TEXT NOT NULL,
    "qrcode" TEXT NOT NULL,

    CONSTRAINT "qrCode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sellerProfile" ADD CONSTRAINT "sellerProfile_qrCodeId_fkey" FOREIGN KEY ("qrCodeId") REFERENCES "qrCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;
