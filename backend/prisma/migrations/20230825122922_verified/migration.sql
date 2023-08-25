/*
  Warnings:

  - You are about to drop the column `isMailVerifild` on the `seller` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "seller" DROP COLUMN "isMailVerifild",
ADD COLUMN     "isMailVerified" BOOLEAN NOT NULL DEFAULT false;
