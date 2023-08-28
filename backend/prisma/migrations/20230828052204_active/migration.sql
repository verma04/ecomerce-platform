/*
  Warnings:

  - You are about to drop the column `productDetialsId` on the `ListOrder` table. All the data in the column will be lost.
  - You are about to drop the column `productDetialsId` on the `list` table. All the data in the column will be lost.
  - You are about to drop the `productDetials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ListOrder" DROP CONSTRAINT "ListOrder_productDetialsId_fkey";

-- DropForeignKey
ALTER TABLE "list" DROP CONSTRAINT "list_productDetialsId_fkey";

-- AlterTable
ALTER TABLE "ListOrder" DROP COLUMN "productDetialsId";

-- AlterTable
ALTER TABLE "list" DROP COLUMN "productDetialsId";

-- DropTable
DROP TABLE "productDetials";
