/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `merchant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `merchant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "merchant" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "kyc" (
    "id" TEXT NOT NULL,

    CONSTRAINT "kyc_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "merchant_slug_key" ON "merchant"("slug");
