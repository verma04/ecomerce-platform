/*
  Warnings:

  - A unique constraint covering the columns `[emailToken]` on the table `seller` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "seller_emailToken_key" ON "seller"("emailToken");
