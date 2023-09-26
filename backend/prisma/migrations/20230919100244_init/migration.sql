/*
  Warnings:

  - You are about to drop the column `title` on the `sellerCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sellerCategory" DROP COLUMN "title",
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "subCategoryId" TEXT;

-- AddForeignKey
ALTER TABLE "sellerCategory" ADD CONSTRAINT "sellerCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerCategory" ADD CONSTRAINT "sellerCategory_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "subCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
