/*
  Warnings:

  - You are about to drop the `sellerLogo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imageId` to the `sellerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sellerLogo" DROP CONSTRAINT "sellerLogo_imageId_fkey";

-- DropForeignKey
ALTER TABLE "sellerLogo" DROP CONSTRAINT "sellerLogo_sellerId_fkey";

-- AlterTable
ALTER TABLE "sellerProfile" ADD COLUMN     "imageId" TEXT NOT NULL;

-- DropTable
DROP TABLE "sellerLogo";

-- AddForeignKey
ALTER TABLE "sellerProfile" ADD CONSTRAINT "sellerProfile_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
