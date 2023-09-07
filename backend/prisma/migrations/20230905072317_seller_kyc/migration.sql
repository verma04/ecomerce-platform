/*
  Warnings:

  - You are about to drop the column `sellerKycId` on the `sellerBankAccount` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sellerProfileId]` on the table `sellerBankAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sellerProfileId` to the `sellerBankAccount` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sellerBankAccount" DROP CONSTRAINT "sellerBankAccount_sellerKycId_fkey";

-- DropIndex
DROP INDEX "sellerBankAccount_sellerKycId_key";

-- AlterTable
ALTER TABLE "sellerBankAccount" DROP COLUMN "sellerKycId",
ADD COLUMN     "isPrimary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sellerProfileId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sellerBankAccount_sellerProfileId_key" ON "sellerBankAccount"("sellerProfileId");

-- AddForeignKey
ALTER TABLE "sellerBankAccount" ADD CONSTRAINT "sellerBankAccount_sellerProfileId_fkey" FOREIGN KEY ("sellerProfileId") REFERENCES "sellerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
