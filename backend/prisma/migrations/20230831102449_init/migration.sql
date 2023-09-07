/*
  Warnings:

  - A unique constraint covering the columns `[sellerId]` on the table `sellerProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sellerProfile_sellerId_key" ON "sellerProfile"("sellerId");
