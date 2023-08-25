/*
  Warnings:

  - You are about to drop the column `userId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `seller` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `seller` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `seller` table. All the data in the column will be lost.
  - You are about to drop the column `subCategoryId` on the `seller` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- DropForeignKey
ALTER TABLE "seller" DROP CONSTRAINT "seller_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "seller" DROP CONSTRAINT "seller_subCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "sellerLogo" DROP CONSTRAINT "sellerLogo_sellerId_fkey";

-- DropIndex
DROP INDEX "seller_slug_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "seller" DROP COLUMN "categoryId",
DROP COLUMN "name",
DROP COLUMN "slug",
DROP COLUMN "subCategoryId";

-- CreateTable
CREATE TABLE "sellerProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "slug" TEXT,
    "categoryId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "sellerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sellerProfile_slug_key" ON "sellerProfile"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "sellerProfile_categoryId_key" ON "sellerProfile"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "sellerProfile_sellerId_key" ON "sellerProfile"("sellerId");

-- AddForeignKey
ALTER TABLE "sellerLogo" ADD CONSTRAINT "sellerLogo_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "sellerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerProfile" ADD CONSTRAINT "sellerProfile_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerProfile" ADD CONSTRAINT "sellerProfile_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
