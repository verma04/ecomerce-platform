/*
  Warnings:

  - The required column `id` was added to the `sellerBankAccount` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "sellerBankAccount" DROP CONSTRAINT "sellerBankAccount_sellerProfileId_fkey";

-- DropIndex
DROP INDEX "sellerBankAccount_sellerProfileId_key";

-- AlterTable
ALTER TABLE "sellerBankAccount" ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "sellerProfileId" DROP NOT NULL,
ADD CONSTRAINT "sellerBankAccount_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "sellerBankAccount" ADD CONSTRAINT "sellerBankAccount_sellerProfileId_fkey" FOREIGN KEY ("sellerProfileId") REFERENCES "sellerProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
