/*
  Warnings:

  - You are about to drop the column `platformCategoryID` on the `category` table. All the data in the column will be lost.
  - Added the required column `businessCategoryID` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_platformCategoryID_fkey";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "platformCategoryID",
ADD COLUMN     "businessCategoryID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_businessCategoryID_fkey" FOREIGN KEY ("businessCategoryID") REFERENCES "businessCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
