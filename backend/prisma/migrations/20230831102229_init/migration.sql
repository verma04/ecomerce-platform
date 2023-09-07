/*
  Warnings:

  - You are about to drop the column `name` on the `sellerProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sellerProfile" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "storeName" TEXT;
