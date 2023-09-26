/*
  Warnings:

  - You are about to drop the column `isComplted` on the `subCategory` table. All the data in the column will be lost.
  - You are about to drop the column `platformCategoryID` on the `subCategory` table. All the data in the column will be lost.
  - Added the required column `platformCategoryID` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subCategory" DROP CONSTRAINT "subCategory_platformCategoryID_fkey";

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "isComplted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "platformCategoryID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sellerProfile" ADD COLUMN     "bussinessCategoryId" TEXT;

-- AlterTable
ALTER TABLE "subCategory" DROP COLUMN "isComplted",
DROP COLUMN "platformCategoryID",
ADD COLUMN     "categoryId" TEXT;

-- CreateTable
CREATE TABLE "bussinessCategory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "bussinessCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bussinessCategory_title_key" ON "bussinessCategory"("title");

-- AddForeignKey
ALTER TABLE "bussinessCategory" ADD CONSTRAINT "bussinessCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_platformCategoryID_fkey" FOREIGN KEY ("platformCategoryID") REFERENCES "bussinessCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subCategory" ADD CONSTRAINT "subCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerProfile" ADD CONSTRAINT "sellerProfile_bussinessCategoryId_fkey" FOREIGN KEY ("bussinessCategoryId") REFERENCES "bussinessCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
