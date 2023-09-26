-- AlterTable
ALTER TABLE "productInformation" ADD COLUMN     "sellerCategoryId" TEXT;

-- AddForeignKey
ALTER TABLE "productInformation" ADD CONSTRAINT "productInformation_sellerCategoryId_fkey" FOREIGN KEY ("sellerCategoryId") REFERENCES "sellerCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
