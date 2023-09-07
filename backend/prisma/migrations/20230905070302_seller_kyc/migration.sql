/*
  Warnings:

  - You are about to drop the column `addressLin1` on the `sellerWareHouse` table. All the data in the column will be lost.
  - Added the required column `addressLine1` to the `sellerWareHouse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sellerWareHouse" DROP COLUMN "addressLin1",
ADD COLUMN     "addressLine1" TEXT NOT NULL;
