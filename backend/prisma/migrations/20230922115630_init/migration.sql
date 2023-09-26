/*
  Warnings:

  - Added the required column `name` to the `variant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `variant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "variant" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
