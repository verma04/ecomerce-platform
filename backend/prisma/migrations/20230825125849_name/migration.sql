/*
  Warnings:

  - Added the required column `sellerName` to the `seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "seller" ADD COLUMN     "sellerName" TEXT NOT NULL;
