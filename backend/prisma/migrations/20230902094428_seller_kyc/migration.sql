/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `sellerKyc` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "seller" ADD COLUMN     "isSellerKycCompleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "sellerKyc" DROP COLUMN "isCompleted";
