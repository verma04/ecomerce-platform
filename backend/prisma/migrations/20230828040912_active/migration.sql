/*
  Warnings:

  - You are about to drop the column `userId` on the `sellerCategory` table. All the data in the column will be lost.
  - Added the required column `sellerId` to the `sellerCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sellerCategory" DROP CONSTRAINT "sellerCategory_userId_fkey";

-- AlterTable
ALTER TABLE "sellerCategory" DROP COLUMN "userId",
ADD COLUMN     "sellerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "sellerCategory" ADD CONSTRAINT "sellerCategory_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
