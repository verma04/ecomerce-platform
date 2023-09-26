/*
  Warnings:

  - You are about to drop the `bussinessCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bussinessCategory" DROP CONSTRAINT "bussinessCategory_userId_fkey";

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_platformCategoryID_fkey";

-- DropForeignKey
ALTER TABLE "sellerProfile" DROP CONSTRAINT "sellerProfile_bussinessCategoryId_fkey";

-- DropTable
DROP TABLE "bussinessCategory";

-- CreateTable
CREATE TABLE "businessCategory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "businessCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "businessCategory_title_key" ON "businessCategory"("title");

-- AddForeignKey
ALTER TABLE "businessCategory" ADD CONSTRAINT "businessCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_platformCategoryID_fkey" FOREIGN KEY ("platformCategoryID") REFERENCES "businessCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerProfile" ADD CONSTRAINT "sellerProfile_bussinessCategoryId_fkey" FOREIGN KEY ("bussinessCategoryId") REFERENCES "businessCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
