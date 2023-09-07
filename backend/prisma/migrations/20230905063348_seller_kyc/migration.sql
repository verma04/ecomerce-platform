/*
  Warnings:

  - Added the required column `country` to the `sellerAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sellerAddress" ADD COLUMN     "country" TEXT NOT NULL;
