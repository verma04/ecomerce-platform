/*
  Warnings:

  - Added the required column `discountedPrice` to the `productInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "productInformation" ADD COLUMN     "discountedPrice" INTEGER NOT NULL;
