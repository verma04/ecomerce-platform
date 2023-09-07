/*
  Warnings:

  - You are about to drop the column `maxiMumValue` on the `coupon` table. All the data in the column will be lost.
  - You are about to drop the column `maxiNumDisccount` on the `coupon` table. All the data in the column will be lost.
  - You are about to drop the column `miniMumValue` on the `coupon` table. All the data in the column will be lost.
  - You are about to drop the column `offerPercent` on the `coupon` table. All the data in the column will be lost.
  - You are about to drop the column `couponId` on the `sellerCategory` table. All the data in the column will be lost.
  - Added the required column `couponName` to the `coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `couponType` to the `coupon` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "loginMethod" AS ENUM ('email', 'google');

-- CreateEnum
CREATE TYPE "couponType" AS ENUM ('percentage', 'flat', 'shipping', 'free', 'getOneFree');

-- DropForeignKey
ALTER TABLE "sellerCategory" DROP CONSTRAINT "sellerCategory_couponId_fkey";

-- AlterTable
ALTER TABLE "coupon" DROP COLUMN "maxiMumValue",
DROP COLUMN "maxiNumDisccount",
DROP COLUMN "miniMumValue",
DROP COLUMN "offerPercent",
ADD COLUMN     "couponName" TEXT NOT NULL,
ADD COLUMN     "couponType" "couponType" NOT NULL;

-- AlterTable
ALTER TABLE "seller" ADD COLUMN     "isKycComplted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "loginMethod" "loginMethod" NOT NULL DEFAULT 'email';

-- AlterTable
ALTER TABLE "sellerCategory" DROP COLUMN "couponId";

-- CreateTable
CREATE TABLE "percentage" (
    "id" TEXT NOT NULL,

    CONSTRAINT "percentage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flat" (
    "id" TEXT NOT NULL,

    CONSTRAINT "flat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping" (
    "id" TEXT NOT NULL,

    CONSTRAINT "shipping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "free" (
    "id" TEXT NOT NULL,

    CONSTRAINT "free_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "getOneFree" (
    "id" TEXT NOT NULL,

    CONSTRAINT "getOneFree_pkey" PRIMARY KEY ("id")
);
