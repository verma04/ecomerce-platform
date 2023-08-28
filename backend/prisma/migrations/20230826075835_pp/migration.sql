/*
  Warnings:

  - You are about to drop the column `categoryId` on the `subCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryId]` on the table `sellerProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `sellerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platformCategoryID` to the `subCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subCategory" DROP CONSTRAINT "subCategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "sellerProfile" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subCategory" DROP COLUMN "categoryId",
ADD COLUMN     "platformCategoryID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sellerProfile_categoryId_key" ON "sellerProfile"("categoryId");

-- AddForeignKey
ALTER TABLE "subCategory" ADD CONSTRAINT "subCategory_platformCategoryID_fkey" FOREIGN KEY ("platformCategoryID") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerProfile" ADD CONSTRAINT "sellerProfile_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
