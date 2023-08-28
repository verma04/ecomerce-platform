/*
  Warnings:

  - Added the required column `sellerCategoryId` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "sellerCategoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_sellerCategoryId_fkey" FOREIGN KEY ("sellerCategoryId") REFERENCES "sellerCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
