/*
  Warnings:

  - You are about to drop the column `addressLin1` on the `sellerAddress` table. All the data in the column will be lost.
  - Added the required column `addressLine1` to the `sellerAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sellerAddress" DROP COLUMN "addressLin1",
ADD COLUMN     "addressLine1" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sellerProfile" ADD COLUMN     "phone" TEXT;
