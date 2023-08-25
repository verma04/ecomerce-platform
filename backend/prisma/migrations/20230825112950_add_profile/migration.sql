/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `subCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "merchant" ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "subCategoryId" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "subCategory" ADD COLUMN     "isComplted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "category_title_key" ON "category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "subCategory_title_key" ON "subCategory"("title");

-- AddForeignKey
ALTER TABLE "merchant" ADD CONSTRAINT "merchant_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "merchant" ADD CONSTRAINT "merchant_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "subCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
