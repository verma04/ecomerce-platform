/*
  Warnings:

  - You are about to drop the column `sellerName` on the `seller` table. All the data in the column will be lost.
  - Added the required column `name` to the `seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "seller" DROP COLUMN "sellerName",
ADD COLUMN     "name" TEXT NOT NULL;
