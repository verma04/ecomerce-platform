/*
  Warnings:

  - You are about to drop the `sellerKyc` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sellerAddress" DROP CONSTRAINT "sellerAddress_sellerKycId_fkey";

-- DropForeignKey
ALTER TABLE "sellerBankAccount" DROP CONSTRAINT "sellerBankAccount_sellerKycId_fkey";

-- DropForeignKey
ALTER TABLE "sellerKyc" DROP CONSTRAINT "sellerKyc_userId_fkey";

-- AlterTable
ALTER TABLE "sellerProfile" ADD COLUMN     "gstIn" TEXT;

-- DropTable
DROP TABLE "sellerKyc";

-- AddForeignKey
ALTER TABLE "sellerAddress" ADD CONSTRAINT "sellerAddress_sellerKycId_fkey" FOREIGN KEY ("sellerKycId") REFERENCES "sellerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sellerBankAccount" ADD CONSTRAINT "sellerBankAccount_sellerKycId_fkey" FOREIGN KEY ("sellerKycId") REFERENCES "sellerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
