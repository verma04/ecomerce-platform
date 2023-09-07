/*
  Warnings:

  - You are about to drop the column `sellerKycId` on the `sellerAddress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sellerProfileId]` on the table `sellerAddress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sellerProfileId` to the `sellerAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sellerAddress" DROP CONSTRAINT "sellerAddress_sellerKycId_fkey";

-- DropIndex
DROP INDEX "sellerAddress_sellerKycId_key";

-- AlterTable
ALTER TABLE "sellerAddress" DROP COLUMN "sellerKycId",
ADD COLUMN     "sellerProfileId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sellerAddress_sellerProfileId_key" ON "sellerAddress"("sellerProfileId");

-- AddForeignKey
ALTER TABLE "sellerAddress" ADD CONSTRAINT "sellerAddress_sellerProfileId_fkey" FOREIGN KEY ("sellerProfileId") REFERENCES "sellerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
