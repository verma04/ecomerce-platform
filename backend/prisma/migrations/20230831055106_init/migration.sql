/*
  Warnings:

  - A unique constraint covering the columns `[uniqueGoogleId]` on the table `seller` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "seller" ADD COLUMN     "uniqueGoogleId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "seller_uniqueGoogleId_key" ON "seller"("uniqueGoogleId");
