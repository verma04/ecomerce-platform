/*
  Warnings:

  - You are about to drop the column `imageId` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "productId" TEXT;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "imageId";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
