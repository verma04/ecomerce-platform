/*
  Warnings:

  - You are about to drop the column `productPerUnitString` on the `productInformation` table. All the data in the column will be lost.
  - Added the required column `productPerUnit` to the `productInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "productInformation" DROP COLUMN "productPerUnitString",
ADD COLUMN     "productPerUnit" TEXT NOT NULL;
