/*
  Warnings:

  - Added the required column `imageId` to the `sellerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qrcodeId` to the `sellerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sellerProfile" ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "qrcodeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "sellerProfile" ADD CONSTRAINT "sellerProfile_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerProfile" ADD CONSTRAINT "sellerProfile_qrcodeId_fkey" FOREIGN KEY ("qrcodeId") REFERENCES "qrcode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
