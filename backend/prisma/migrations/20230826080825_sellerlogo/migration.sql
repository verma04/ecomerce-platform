/*
  Warnings:

  - You are about to drop the column `imageId` on the `sellerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `qrcodeId` on the `sellerProfile` table. All the data in the column will be lost.
  - Added the required column `logoId` to the `sellerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qrCodeId` to the `sellerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sellerProfile" DROP CONSTRAINT "sellerProfile_imageId_fkey";

-- DropForeignKey
ALTER TABLE "sellerProfile" DROP CONSTRAINT "sellerProfile_qrcodeId_fkey";

-- AlterTable
ALTER TABLE "sellerProfile" DROP COLUMN "imageId",
DROP COLUMN "qrcodeId",
ADD COLUMN     "logoId" TEXT NOT NULL,
ADD COLUMN     "qrCodeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "sellerProfile" ADD CONSTRAINT "sellerProfile_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerProfile" ADD CONSTRAINT "sellerProfile_qrCodeId_fkey" FOREIGN KEY ("qrCodeId") REFERENCES "qrcode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
